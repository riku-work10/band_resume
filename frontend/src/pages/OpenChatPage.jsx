import React, { useEffect, useRef, useState } from "react";
import getCable from "../utils/cable";
import apiClient from "../services/apiClient";
import StarEffect from "../components/openchat/StarEffect";
import "../components/openchat/OpenChat.css";
import StarField from "../components/openchat/StarField";

const OpenChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [editingMessage, setEditingMessage] = useState(null); // 編集用のメッセージ
  const cableRef = useRef(null);
  const bottomRef = useRef(null);

  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await apiClient.get("/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("メッセージの取得に失敗しました:", err);
      }
    };

    if (token && client && uid) {
      fetchMessages();
    }
  }, [token, client, uid]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!token || !client || !uid) return;
  
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
  
    const cable = getCable(token, uid, client);
  
    const createSubscription = () => {
      cableRef.current = cable.subscriptions.create(
        { channel: "ChatChannel" },
        {
          connected() {
            console.log("✅ Connected to ChatChannel");
            reconnectAttempts = 0; // 成功したらリセット
          },
          disconnected() {
            console.log("⚠️ Disconnected from ChatChannel");
  
            if (reconnectAttempts < maxReconnectAttempts) {
              const timeout = Math.min(3000 * (reconnectAttempts + 1), 10000); // だんだん待ち時間延ばす
              setTimeout(() => {
                console.log(`🔄 Reconnecting... (attempt ${reconnectAttempts + 1})`);
                reconnectAttempts++;
                createSubscription(); // 再度購読
              }, timeout);
            } else {
              console.log("❌ Reconnect limit reached. Giving up.");
            }
          },
          received: (data) => {
            setMessages((prev) => [...prev, data.message]);
          },
        }
      );
    };
  
    createSubscription();
  
    return () => {
      if (cableRef.current) {
        cableRef.current.unsubscribe();
      }
      cable.disconnect(); // 念のため切断
    };
  }, [token, client, uid]);
  

  const sendMessage = () => {
    if (!content.trim()) return;

    cableRef.current.perform("speak", {
      message: content,
    });

    setContent("");
  };

  // メッセージ編集の処理
  const startEditMessage = (message) => {
    setEditingMessage(message); // 編集するメッセージを設定
    setContent(message.content); // 入力欄にメッセージ内容をセット
  };

  const cancelEdit = () => {
    setEditingMessage(null); // 編集キャンセル
    setContent(""); // 入力欄をクリア
  };

  const updateMessage = async () => {
    if (!content.trim() || !editingMessage) return;

    try {
      const res = await apiClient.put(`/messages/${editingMessage.id}`, {
        message: { content },
      });

      // メッセージを更新
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === res.data.id ? { ...msg, content: res.data.content } : msg
        )
      );

      cancelEdit(); // 編集をキャンセル
    } catch (err) {
      console.error("メッセージの更新に失敗しました:", err);
    }
  };

  // メッセージ削除の処理
  const deleteMessage = async (messageId) => {
    try {
      await apiClient.delete(`/messages/${messageId}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      console.error("メッセージの削除に失敗しました:", err);
    }
  };

  return (
  <div className="relative flex flex-col h-screen bg-black text-white mt-4 overflow-hidden bg-dawn">

    {/* メッセージエリア */}
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 z-10 bg-dawn">
    <StarEffect />
    <StarField count={200} />
      {messages.map((msg) => {
        const isMine = msg.user?.uid === uid;
        return (
          <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
<div
  className={`px-4 py-2 rounded-lg max-w-[75%] break-words text-sm shadow-md backdrop-blur-sm ${
    isMine
      ? "bg-[#5aa7ce]/90 text-white" // 自分：少し濃い水色
      : "bg-[#4a587a]/85 text-white" // 相手：より深めの群青
  }`}
>

              <span className="block text-xs opacity-70 mb-1">{msg.user?.name || "匿名"}</span>
              {msg.content}
              {isMine && (
                <div className="mt-1 flex gap-2 text-xs opacity-80">
              <div className="mt-1 flex gap-2 text-xs opacity-90">
  <button
    onClick={() => startEditMessage(msg)}
    className="text-orange-400 hover:text-orange-300"
  >
    編集
  </button>
  <button
    onClick={() => deleteMessage(msg.id)}
    className="text-red-400 hover:text-red-300"
  >
    削除
  </button>
</div>
            </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>

    {/* 入力エリア */}
    <div className="p-4 bg-gray-900 border-t border-gray-700 flex gap-2 z-10">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            editingMessage ? updateMessage() : sendMessage();
          }
        }}
        placeholder="メッセージを入力"
        className="flex-1 p-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
      />
      {editingMessage ? (
        <>
<button
  onClick={updateMessage}
  className="px-4 py-2 rounded bg-gradient-to-b from-orange-400 to-orange-500 text-white hover:brightness-110 transition"
>
  更新
</button>

<button
  onClick={cancelEdit}
  className="px-4 py-2 rounded bg-gradient-to-b from-gray-600 to-gray-700 text-white hover:brightness-110 transition"
>
  キャンセル
</button>
        </>
      ) : (
<button
  onClick={sendMessage}
  className="px-4 py-2 rounded bg-gradient-to-b from-orange-500 to-pink-500 text-white hover:brightness-110 transition"
>
  送信
</button>
      )}
    </div>
  </div>
);
};

export default OpenChatPage;
