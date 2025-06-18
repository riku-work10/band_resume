import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';

export function InitializeResumeSections({ resumeId, setResumeSectionsList }) {
  const [loading, setLoading] = useState(true);
  const [isInitializingTemplate, setIsInitializingTemplate] = useState(false); // 明示的にフラグ管理

  useEffect(() => {
    const fetchAndInitializeSections = async () => {
      try {
        const res = await apiClient.get(`resumes/${resumeId}/resume_sections`);

        // 分岐：テンプレが必要かどうか
        const isEmpty = res.data.length === 0;
        setIsInitializingTemplate(isEmpty);

        if (isEmpty) {
          // 初期テンプレートを作成
          const defaultSections = [
            {
              title: '好きになったきっかけ',
              items: [{ content: 'ライブ映像を見て一目惚れしました。' }],
            },
            {
              title: '好きな曲',
              items: [
                { song_title: '宇宙飛行士' },
                { song_title: 'predawn' },
                { song_title: '陽光' },
              ],
            },
            {
              title: 'ライブで聞いてみたい曲',
              items: [
                { song_title: '陽光' },
                { song_title: 'unconditional' },
                { song_title: '遥' },
                { song_title: '君と僕にしか出来ない事がある' },
              ],
            },
            {
              title: 'ライブ参戦履歴',
              items: [
                { content: 'ヨーロー劇場2021 - 赤青緑で白い幕 -' },
                { content: '日本武道館単独公演 ハルカミライ「A CRATER」' },
                {
                  content:
                    '「ヨーロー劇場2025-2026 47都道府県ワンマンツアー -BOOGER JOE-」【名古屋 DIAMOND HALL】',
                },
              ],
            },
          ];

          const createdSections = [];

          for (const [sectionIndex, section] of defaultSections.entries()) {
            const secRes = await apiClient.post(`resumes/${resumeId}/resume_sections`, {
              resume_section: {
                title: section.title,
                position: sectionIndex,
              },
            });

            const sectionId = secRes.data.id;

            for (const [itemIndex, item] of section.items.entries()) {
              await apiClient.post(
                `resumes/${resumeId}/resume_sections/${sectionId}/resume_items`,
                {
                  resume_item: {
                    content: item.content || '',
                    song_title: item.song_title || '',
                    position: itemIndex,
                  },
                },
              );
            }

            createdSections.push(secRes.data);
          }

          setResumeSectionsList(createdSections);
        } else {
          setResumeSectionsList(res.data);
        }
      } catch (error) {
        console.error('Error initializing sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndInitializeSections();
  }, [resumeId, setResumeSectionsList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg font-medium">
            {isInitializingTemplate ? 'テンプレを用意中...' : 'データを取得中...'}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
