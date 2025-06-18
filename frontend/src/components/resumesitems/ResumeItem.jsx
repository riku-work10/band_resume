import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDelete, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import apiClient from '../../services/apiClient';

export function ResumeItem({ index, item, itemList, setItemList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(item.content || '');

  const handleDelete = async (itemId) => {
    try {
      const response = await apiClient.delete(`resume_items/${itemId}`);
      console.log(response.data.message);
      setItemList(itemList.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditContent(item.content || '');
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(item.content || '');
  };

  const handleEditSave = async () => {
    try {
      if (!editContent.trim()) {
        await handleDelete(item.id);
        return;
      }

      await apiClient.put(`resume_items/${item.id}`, {
        resume_item: {
          content: editContent,
        },
      });

      const updatedItemList = itemList.map((listItem) =>
        listItem.id === item.id ? { ...listItem, content: editContent } : listItem
      );
      setItemList(updatedItemList);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <Draggable index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative bg-stone-700 rounded-lg overflow-hidden border transition-colors duration-200
            ${snapshot.isDragging ? 'border-stone-400' : 'border-stone-600'}`}
        >
          <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-3 text-sm sm:text-base">
            {/* 楽曲タイトル + 削除ボタン */}
            {item.song_title && (
              <div className="flex justify-between items-start text-stone-200">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{item.song_title}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-red-700 hover:bg-red-800 text-white rounded-md text-xs sm:text-sm"
                  title="削除"
                >
                  <MdDelete size={14} />
                </button>
              </div>
            )}

            {/* 編集モード */}
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 bg-stone-800 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px] resize-y text-sm sm:text-base"
                  placeholder="内容を入力してください（空白で保存すると削除されます）"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSave();
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-green-700 hover:bg-green-800 text-white rounded-md text-sm"
                  >
                    <MdSave size={16} />
                    保存
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCancel();
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-stone-600 hover:bg-stone-700 text-white rounded-md text-sm"
                  >
                    <MdCancel size={16} />
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              item.content && (
                <div className="flex justify-between items-start">
                  <p className="text-stone-200 leading-relaxed w-full pr-3 break-words">
                    {item.content}
                  </p>

                  {/* 編集・削除（楽曲以外のアイテムに表示） */}
                  {!item.song_title && (
                    <div className="flex gap-2 flex-shrink-0 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStart();
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-xs sm:text-sm"
                        title="編集"
                      >
                        <MdEdit size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-red-700 hover:bg-red-800 text-white rounded-md text-xs sm:text-sm"
                        title="削除"
                      >
                        <MdDelete size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
