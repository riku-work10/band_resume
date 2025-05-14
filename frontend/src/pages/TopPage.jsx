import { motion } from "framer-motion";
import FloatingLyrics from "../components/toppage/FloatingLyrics";

const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 4 + 2}px`,
  delay: Math.random() * 3,
}));

const LiveStagePage = () => {
  return (
    <div
      className="relative w-full h-screen bg-black bg-cover bg-center overflow-hidden"
      // style={{
      //   backgroundImage:
      //     "url('https://www.musicman.co.jp/wp-content/uploads/2022/07/220702_tatewaki_2856-1560x1040.jpg')",
      // }}
    >
      {/* 暗がりオーバーレイ */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <FloatingLyrics />

      {/* 星アニメーション */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white z-20 opacity-80"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* メインテキスト */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-widest drop-shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ハルカミライ履歴書
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          To live is to have hope as small as a booger.
        </motion.p>
      </div>

      {/* 底からの光（スポットライト風） */}
      <div className="absolute bottom-0 w-full h-1/2 z-0 animate-pulse bg-gradient-to-t from-blue-700 via-transparent to-transparent opacity-30 blur-xl" />
    </div>
  );
};

export default LiveStagePage;
