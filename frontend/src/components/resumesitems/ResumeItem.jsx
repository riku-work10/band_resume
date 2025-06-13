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

      const response = await apiClient.put(`resume_items/${item.id}`, {
        resume_item: {
          content: editContent,
        },
      });

      const updatedItemList = itemList.map((listItem) =>
        listItem.id === item.id ? { ...listItem, content: editContent } : listItem,
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
          {...provided.dragHandleProps} // 全体がドラッグ可能
          className={`relative bg-stone-700 rounded-lg overflow-hidden border transition-colors duration-200
            ${snapshot.isDragging ? 'border-stone-400' : 'border-stone-600'}`}
        >
          <div className="pl-4 pr-4 py-3 space-y-3">
            {/* 楽曲タイトルと削除ボタン */}
            {item.song_title && (
              <div className="flex justify-between items-start text-stone-200">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.song_title}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-red-700 hover:bg-red-800 text-white rounded-md text-xs"
                    title="削除"
                  >
                    <MdDelete size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* コンテンツ編集モード */}
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 bg-stone-800 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px] resize-y"
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
                  <p className="text-stone-200 text-sm leading-relaxed w-full pr-3">
                    {item.content}
                  </p>

                  {!item.song_title && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStart();
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-xs"
                        title="編集"
                      >
                        <MdEdit size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-red-700 hover:bg-red-800 text-white rounded-md text-xs"
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
