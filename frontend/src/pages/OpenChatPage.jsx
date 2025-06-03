import React, { useEffect, useRef, useState } from "react";
import getCable from "../utils/cable";
import apiClient from "../services/apiClient";
// import StarEffect from "../components/openchat/StarEffect";
import "../components/openchat/OpenChat.css";
import StarField from "../components/openchat/StarField";
import { MdDelete, MdEdit } from "react-icons/md";

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
            reconnectAttempts = 0;
          },
          disconnected() {
            console.log("⚠️ Disconnected from ChatChannel");

            if (reconnectAttempts < maxReconnectAttempts) {
              const timeout = Math.min(3000 * (reconnectAttempts + 1), 10000);
              setTimeout(() => {
                console.log(`🔄 Reconnecting... (attempt ${reconnectAttempts + 1})`);
                reconnectAttempts++;
                createSubscription();
              }, timeout);
            } else {
              console.log("❌ Reconnect limit reached. Giving up.");
            }
          },
          received: (data) => {
            if (data.action === "edit") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === data.message_id
                    ? { ...msg, content: data.new_content }
                    : msg
                )
              );
            } else if (data.action === "delete") {
              setMessages((prev) =>
                prev.filter((msg) => msg.id !== data.message_id)
              );
            } else if (data.message) {
              setMessages((prev) => [...prev, data.message]);
            }
          },
        }
      );
    };

    createSubscription();

    return () => {
      if (cableRef.current) {
        cableRef.current.unsubscribe();
      }
      cable.disconnect();
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

  const updateMessage = () => {
    if (!content.trim() || !editingMessage) return;

    cableRef.current.perform("edit_message", {
      message_id: editingMessage.id,
      new_content: content,
    });

    cancelEdit(); // ローカル編集状態をリセット
  };

  const deleteMessage = (messageId) => {
    cableRef.current.perform("delete_message", {
      message_id: messageId,
    });
  };

return (
<div className="relative flex flex-col h-screen bg-black text-white overflow-hidden bg-dawn">

  {/* メッセージエリア */}
  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 z-10 bg-dawn">
  {/* <StarEffect /> */}
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
                <div className="flex justify-end mt-1">
                  <div className="flex gap-2 text-sm opacity-80">
                    <button
                      onClick={() => startEditMessage(msg)}
                      className="text-orange-400 hover:text-orange-300 transition"
                      title="編集"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-red-400 hover:text-red-300 transition"
                      title="削除"
                    >
                      <MdDelete size={18} />
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
