import './HarukamiraiTitle.css';

const HarukamiraiTitle = () => {
  const title = "ハルカミライ";
  return (
    <div className="arc-wrapper">
      {title.split("").map((char, index) => {
        const radius = 110;
        const angleDeg = (index - (title.length - 1) / 2) * 18;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = radius * Math.sin(angleRad);
        const y = radius * Math.cos(angleRad);
        return (
          <span
            key={index}
            className="arc-letter"
            style={{
              transform: `translate(${x}px, ${-y}px) rotate(${angleDeg}deg)`,
              fontSize: '3rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {char}
          </span>
        );
      })}
      <div className="arc-label">履歴書</div>
    </div>
  );
};

export default HarukamiraiTitle;
