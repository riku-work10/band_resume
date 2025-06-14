import React, { useEffect, useRef, useState } from 'react';
import getCable from '../utils/cable';
import apiClient from '../services/apiClient';
// import StarEffect from "../components/openchat/StarEffect";
import '../components/openchat/OpenChat.css';
import StarField from '../components/openchat/StarField';
import { MdDelete, MdEdit } from 'react-icons/md';
import NgMessage from '../components/openchat/NgMessage';


function OpenChatPage() {
 
  const containsProhibitedWord = (text) => {
    return NgMessage.some((word) => text.includes(word));
  };
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [editingMessage, setEditingMessage] = useState(null); // 編集用のメッセージ
  const cableRef = useRef(null);
  const bottomRef = useRef(null);

  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await apiClient.get('/messages');
        setMessages(res.data);
      } catch (err) {
        console.error('メッセージの取得に失敗しました:', err);
      }
    };

    if (token && client && uid) {
      fetchMessages();
    }
  }, [token, client, uid]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (!token || !client || !uid) return;

    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const cable = getCable(token, uid, client);

    const createSubscription = () => {
      cableRef.current = cable.subscriptions.create(
        { channel: 'ChatChannel' },
        {
          connected() {
            console.log('✅ Connected to ChatChannel');
            reconnectAttempts = 0;
          },
          disconnected() {
            console.log('⚠️ Disconnected from ChatChannel');

            if (reconnectAttempts < maxReconnectAttempts) {
              const timeout = Math.min(3000 * (reconnectAttempts + 1), 10000);
              setTimeout(() => {
                console.log(`🔄 Reconnecting... (attempt ${reconnectAttempts + 1})`);
                reconnectAttempts++;
                createSubscription();
              }, timeout);
            } else {
              console.log('❌ Reconnect limit reached. Giving up.');
            }
          },
          received: (data) => {
            if (data.action === 'edit') {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === data.message_id ? { ...msg, content: data.new_content } : msg,
                ),
              );
            } else if (data.action === 'delete') {
              setMessages((prev) => prev.filter((msg) => msg.id !== data.message_id));
            } else if (data.message) {
              setMessages((prev) => [...prev, data.message]);
            }
          },
        },
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

  // メッセージ編集の処理
  const startEditMessage = (message) => {
    setEditingMessage(message); // 編集するメッセージを設定
    setContent(message.content); // 入力欄にメッセージ内容をセット
  };

  const cancelEdit = () => {
    setEditingMessage(null); // 編集キャンセル
    setContent(''); // 入力欄をクリア
  };

  const sendMessage = () => {
    if (!content.trim()) return;

    if (containsProhibitedWord(content)) {
      alert('不適切な表現が含まれています。修正してください。');
      return;
    }

    cableRef.current.perform('speak', { message: content });
    setContent('');
  };

  const updateMessage = async () => {
    if (!content.trim() || !editingMessage) return;

    if (containsProhibitedWord(content)) {
      alert('不適切な表現が含まれています。修正してください。');
      return;
    }

    try {
      const res = await apiClient.put(`/messages/${editingMessage.id}`, {
        message: { content },
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id === res.data.id ? { ...msg, content: res.data.content } : msg)),
      );
      cancelEdit();
    } catch (err) {
      console.error('メッセージの更新に失敗しました:', err);
    }
  };

  const deleteMessage = (messageId) => {
    cableRef.current.perform('delete_message', {
      message_id: messageId,
    });
  };

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden bg-dawn">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 z-10 bg-dawn">
        <StarField count={200} />
        {messages.map((msg) => {
          const isMine = msg.user?.uid === uid;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow-lg backdrop-blur-sm border border-stone-500/40 ${
                  isMine ? 'bg-orange-600/90 text-white' : 'bg-stone-600/90 text-white'
                }`}
              >
                <span className="block text-xs opacity-70 mb-1">{msg.user?.name || '匿名'}</span>

                <div className="flex items-center gap-2">
                  <span className="whitespace-pre-wrap break-words">{msg.content}</span>

                  {isMine && (
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => startEditMessage(msg)}
                        className="text-blue-400 hover:text-blue-300 transition"
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-stone-900 border-t border-stone-600 flex gap-2 z-10">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              editingMessage ? updateMessage() : sendMessage();
            }
          }}
          placeholder="メッセージを入力"
          className="flex-1 p-2 rounded bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none"
        />
        {editingMessage ? (
          <>
            <button
              onClick={updateMessage}
              className="px-4 py-2 rounded bg-gradient-to-b from-orange-600 to-orange-500 text-white hover:brightness-110 transition"
            >
              更新
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 rounded bg-gradient-to-b from-stone-600 to-stone-700 text-white hover:brightness-110 transition"
            >
              キャンセル
            </button>
          </>
        ) : (
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded bg-gradient-to-b from-orange-500 to-orange-600 text-white hover:brightness-110 transition"
          >
            送信
          </button>
        )}
      </div>
    </div>
  );
}

export default OpenChatPage;
