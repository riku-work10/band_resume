import { motion } from 'framer-motion';
import FloatingLyrics from '../toppage/FloatingLyrics';

const stars = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 2}px`,
  delay: Math.random() * 2,
}));

export default function TopLikeSection() {
  return (
<motion.section
  className="content-section relative bg-black text-white min-h-screen"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
      {/* 星アニメーション */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white opacity-80"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
        <FloatingLyrics />
      {/* テキスト */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ハルカミライ履歴書
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          To live is to have hope as small as a booger.
        </motion.p>
      </div>
    </motion.section>
  );
}
