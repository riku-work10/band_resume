import { useEffect, useState } from 'react';

function StarField({ count = 150 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: count }, () => ({
      id: crypto.randomUUID(),
      x: Math.random() * 100, // initial X (%)
      y: Math.random() * 100, // initial Y (%)
      delay: Math.random() * 5, // random delay
      duration: Math.random() * 3 + 3, // 3s ~ 6s
      size: Math.random() * 1.5 + 1, // 1px ~ 2.5px
    }));
    setStars(generatedStars);
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0,
            animation: `flyForward ${star.duration}s linear ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* アニメーションCSS */}
      <style jsx>{`
        @keyframes flyForward {
          0% {
            transform: scale(0.3) translateZ(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: scale(3) translateZ(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default StarField;
