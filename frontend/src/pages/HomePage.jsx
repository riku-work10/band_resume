import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../components/homepage/HomePage.css";
import ImageSlider from "../components/homepage/ImageSlider";

function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="intro-logo">ハルカミライ履歴書</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.section
          className="hero"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/images/001.jpg"
            alt="Hero"
            className="hero-image"
          />
          <div className="hero-logo">ハルカミライ履歴書</div>
          <div className="hero-buttons">
            <Link to="/signup"><button className="hero-btn">新規登録</button></Link>
            <Link to="/signin"><button className="hero-btn secondary">ログイン</button></Link>
          </div>
          <div className="scroll-indicator">
            <span>SCROLL</span>
            <div className="arrow-wrapper">
              <div className="arrow-icon">↓</div>
            </div>
          </div>
        </motion.section>
      )}

      {!showIntro && (
        <>
          <HeroSection />
          <Section
            title="自分だけのハルカミライ履歴書を作ろう！"
            content="「好きな曲、聞いてみたい曲、好きな歌詞、最高だったライブ」あなたのハルカミライを共有しよう！"
            bg="#2a9d8f"
            UseUrl="https://www.youtube.com/embed/3fumBcKC6RE"
          />
          <Section
            title="ライブ情報セトリやMCを共有、あなただけのライブ参戦履歴"
            content="「あの時のライブのセトリなんだったけ？、いままで行ったライブまとめたい」あなただけのハルカミライ参戦履歴を作ってみてください！※ライブ情報の登録大歓迎です"
            bg="#264653"
            UseUrl="https://www.youtube.com/embed/5NV6Rdv1a3I"
            reverse
          />
          <Section
            title="感動・興奮・余韻を共有しよう！"
            content="「セトリ神すぎた！、predawn初めて聞けた！、余韻がやばい、グッズかわいい！」あなたが思ったこと感じたことをなんでもチャットで共有しよう！"
            bg="#263333"
            UseUrl="https://www.youtube.com/embed/kJQP7kiw5Fk"
          />
          <FinalLogoSection />
        </>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section
      className="hero-section"
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
      className={`content-section ${reverse ? "reverse" : ""}`}
      style={{ backgroundColor: bg }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="section-text">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>

      <div className="section-video">
        <iframe
          src={UseUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </motion.section>
  );
}

function FinalLogoSection() {
  return (
    <motion.section
      className="final-logo-section"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <img
        src="https://img.barks.jp/img/article/1000248172/H/1200.jpg"
        alt="ロゴ"
        className="final-logo-img"
      />
      <h2 className="final-logo-text">ハルカミライ履歴書</h2>
    </motion.section>
  );
}

export default HomePage;
