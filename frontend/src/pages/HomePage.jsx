import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../components/homepage/HomePage.css';
import ImageSlider from '../components/homepage/ImageSlider';
import TopLikeSection from '../components/homepage/TopLikeSection';

// Gyazoの.mp4 URLから embed URL に変換
function convertToEmbedUrl(url) {
  const match = url.match(/\/([a-f0-9]{32})\.mp4$/);
  if (!match) return url; // fallback
  return `https://gyazo.com/${match[1]}/embed`;
}

function HomePage() {
  return (
    <div className="App">
      <motion.section
        className="hero"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="/images/001.jpg" alt="Hero" className="hero-image" />
        <div className="hero-logo">ハルカミライ履歴書</div>
        <div className="hero-buttons">
          <Link to="/signup">
            <button className="hero-btn">新規登録</button>
          </Link>
          <Link to="/signin">
            <button className="hero-btn secondary">ログイン</button>
          </Link>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="arrow-wrapper">
            <div className="arrow-icon">↓</div>
          </div>
        </div>
      </motion.section>

      <HeroSection />

      <Section
        title="自分だけのハルカミライ履歴書を作ろう！"
        content="「好きな曲、聞いてみたい曲、好きな歌詞、最高だったライブ」あなたのハルカミライを共有しよう！作成した内容をドラッグ＆ドロップで自分だけのオリジナル履歴書にカスタマイズしよう！"
        bg="#2a9d8f"
        UseUrl="https://t.gyazo.com/teams/harukamirai-resume/653c80175e4096d68ddf4281a9e4ea5e.mp4"
      />
      <Section
        title="ライブ情報セトリやMCを共有、あなただけのライブ参戦履歴"
        content="「あの時のライブのセトリなんだったけ？、いままで行ったライブまとめたい」あなただけのハルカミライ参戦履歴を作ってみてください！※ライブ情報の登録大歓迎です"
        bg="#264653"
        UseUrl="https://t.gyazo.com/teams/harukamirai-resume/ff67937d86089748d18d4b4569db64da.mp4"
        reverse
      />
      <Section
        title="感動・興奮・余韻を共有しよう！"
        content="「セトリ神すぎた！、predawn初めて聞けた！、余韻がやばい、グッズかわいい！」あなたが思ったこと感じたことをなんでもチャットで共有しよう！※誹謗中傷や不快な発言はNGです"
        bg="#263333"
        UseUrl="https://t.gyazo.com/teams/harukamirai-resume/fd8e0a0e14c335ef408504bddb785468.mp4"
      />

      <TopLikeSection className="top-like-section" />
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section
      className="hero-section slider-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="hero-content">
        <ImageSlider />
      </div>
    </motion.section>
  );
}

function Section({ title, bg, UseUrl, reverse = false, content }) {
  return (
    <motion.section
      className={`content-section ${reverse ? 'reverse' : ''}`}
      style={{ backgroundColor: bg }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="section-text">
        <h2>{title}</h2>
        <p className="section-text">{content}</p>
      </div>

      <div className="section-video">
        <iframe
          src={convertToEmbedUrl(UseUrl)}
          width="100%"
          height="315"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Gyazo video"
        ></iframe>
      </div>
    </motion.section>
  );
}

export default HomePage;
