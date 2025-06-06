import { useEffect } from 'react';
import apiClient from '../../services/apiClient';

export const InitializeResumeSections = ({ resumeId, setResumeSectionsList }) => {
  useEffect(() => {
    const fetchAndInitializeSections = async () => {
      try {
        const res = await apiClient.get(`resumes/${resumeId}/resume_sections`);
        if (res.data.length === 0) {
          const defaultSections = [
            {
              title: '好きになったきっかけ',
              items: [
                { content: 'ライブ映像を見て一目惚れしました。' }
              ]
            },
            {
              title: '好きな曲',
              items: [
                { song_title: '宇宙飛行士' },
                { song_title: 'predawn' },
                { song_title: '陽光' }
              ]
            },
            {
              title: 'ライブで聞いてみたい曲',
              items: [
                { song_title: '陽光' },
                { song_title: 'unconditional' },
                { song_title: '遥' },
                { song_title: '君と僕にしか出来ない事がある' }
                
              ]
            },
            {
              title: 'ライブ参戦履歴',
              items: [
                { content: 'ヨーロー劇場2021 - 赤青緑で白い幕 -' },
                { content: '日本武道館単独公演 ハルカミライ「A CRATER」' },
                { content: '「ヨーロー劇場2025-2026 47都道府県ワンマンツアー -BOOGER JOE-」【名古屋 DIAMOND HALL】' },
              ]
            },
          ];

          const createdSections = [];

          for (const [sectionIndex, section] of defaultSections.entries()) {
            const secRes = await apiClient.post(`resumes/${resumeId}/resume_sections`, {
              resume_section: {
                title: section.title,
                position: sectionIndex
              }
            });

            const sectionId = secRes.data.id;

            for (const [itemIndex, item] of section.items.entries()) {
              await apiClient.post(`resumes/${resumeId}/resume_sections/${sectionId}/resume_items`, {
                resume_item: {
                  content: item.content || '',
                  song_title: item.song_title || '',
                  position: itemIndex
                }
              });
            }

            createdSections.push(secRes.data);
          }

          setResumeSectionsList(createdSections);
        } else {
          setResumeSectionsList(res.data);
        }
      } catch (error) {
        console.error('Error initializing sections:', error);
      }
    };

    fetchAndInitializeSections();
  }, [resumeId, setResumeSectionsList]);

  return null; // UIは不要なので描画しない
};
