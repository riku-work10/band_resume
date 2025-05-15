import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StarEffect = () => {
  const [stars, setStars] = useState([]);

  const random = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const interval = setInterval(() => {
      const id = crypto.randomUUID();
      setStars((prev) => [
        ...prev,
        {
          id,
          size: random(2, 6),
          left: random(0, 100),
          duration: random(3, 6),
          isMeteor: Math.random() > 0.7,
        },
      ]);
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id));
      }, 6000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            opacity: 0,
            y: star.isMeteor ? -200 : -100,
            x: star.isMeteor ? -100 : 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            y: "100vh",
            x: star.isMeteor ? "100vw" : 0,
            scale: 1.2,
          }}
          transition={{
            duration: star.duration,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full ${
            star.isMeteor ? "bg-orange-400" : "bg-white"
          }`}
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: "-10px",
            boxShadow: "0 0 6px 2px white",
          }}
        />
      ))}
    </div>
  );
};

export default StarEffect;
