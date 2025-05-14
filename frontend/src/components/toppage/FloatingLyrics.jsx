import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lyrics = [
  "星を目指して", "君に届け", "光の中で", "いつかの夢を", "声を重ねて",
  "夜を越えて", "終わらない歌", "手を伸ばして", "あの日の約束", "煌めく瞬間"
];

const getRandomLyric = () => {
  const text = lyrics[Math.floor(Math.random() * lyrics.length)];
  const top = Math.random() * 80 + 10;  // 10〜90% 縦位置
  const left = Math.random() * 80 + 10; // 10〜90% 横位置
  return { id: Date.now() + Math.random(), text, top, left };
};

const FloatingLyrics = () => {
  const [floatingLyrics, setFloatingLyrics] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lyric = getRandomLyric();
      setFloatingLyrics((prev) => [...prev, lyric]);

      // 5秒後に自動削除
      setTimeout(() => {
        setFloatingLyrics((prev) => prev.filter((l) => l.id !== lyric.id));
      }, 5000);
    }, 2500); // 2.5秒ごとに出現

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {floatingLyrics.map((lyric) => (
          <motion.div
            key={lyric.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: `${lyric.top}%`,
              left: `${lyric.left}%`,
              color: "#ffffff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textShadow: "0 0 8px #fff",
              whiteSpace: "nowrap"
            }}
          >
            {lyric.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingLyrics;
