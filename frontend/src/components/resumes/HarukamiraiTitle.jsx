import '../../css/HarukamiraiTitle.css';

const HarukamiraiTitle = () => {
  const title = "ハルカミライ";

  return (
    <div className="arc-wrapper">
      {title.split("").map((char, index) => {
        const radius = 100; // アーチの半径
        const angleDeg = (index - (title.length - 1) / 2) * 15;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = radius * Math.sin(angleRad);
        const y = radius * Math.cos(angleRad);

        return (
          <span
            key={index}
            className="arc-letter"
            style={{
              transform: `translate(${x}px, ${-y}px) rotate(${angleDeg}deg)`
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