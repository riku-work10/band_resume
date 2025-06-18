import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lyrics = [
  '眠れない夜に私、ブルーハーツを聴くのさ',
  '眠れない夜に私、涙は流さない',
  'ねえ、サテライト見つけてほしい',
  '君好みの味は基本は薄めで',
  '来世もその次も巡り会えないのなら',
  '世界を変えて、君の僕になって',
  '朝になって、夜になって、風になって、星になって',
  '海になって、鳥になって、花になって、季節になって',
  '願い事は簡単に叶わない事知ってるから',
  'アイワナビー　わがままでいようぜ',
  'あいつのことならおれが　ぶっ飛ばしといてやるから',
  '一番綺麗な君を見てた　一番小さなこの世界で',
  '月に目隠しして　ロウソクに火を点けて',
  '海を超えて　遠く海を越えて　君をめがけて行く',
  '',
  '歓びの歌が俺の前で鳴ってる',
  '君よどうか　側にいて　抱きしめてくれ歓びの歌',
  '去年よりも少し暖かい午後２時だ',
  '君には忘れないで欲しくて　君には笑って欲しくて',
  '生まれ変わったら会いに行くよ　今度は私から',
  '君だけに内緒で教えるよ　科学者も知らない秘密を',
  '君にしか歌えない　君にしか歌えない',
  'コンビニの駐車場エンジン鳴く',
  '朝焼けの街が冷たい目をこするんだ',
  'それなら夜は煌めくだろう',
  'そのうち夜は明けるだろう',
  '待ちわびてた　春が来ること',
  '君には全てをあげるよ　愛も憎しみも歓喜も悲哀も',
  'サヨナラ愛のパレード',
  '感傷的な僕達の夜に　伸びたあのオレンジの灯り',
  '星屑の中で俺たちが呼んでいる',
  'ラムネは瓶がいい',
  '久しぶり',
  '僕ら世界の真ん中　眠らない街をすり抜けて',
  '１２月７日午後７時過ぎ　君の書いた日記のこと',
  'Hello, wonder. Hello, Wonder',
  'ほら準備して　ゆうひの丘まで競争さ',
  '永遠のように幻みたいに',
  'さくら　さくら　さくら',
  '風が僕らを揺らしても　季節が過ぎても',
  '君より早く死なないから　僕より早く死なないでね',
  '山間が赤く染まる頃　高速道路を走ってく',
  '夕景　田舎道を走ってたんだ　嬉しかったんだ',
  '調子いいからやっぱ憎めないな',
  '音漏れがあの曲で許してやった',
  '幸せになろうよ　たった一度だけ',
  '君は何処へもいかない',
  '真夜中のサーチライト　行こうか',
];

const getRandomLyric = () => {
  const isMobile = window.innerWidth < 768;
  const top = isMobile ? Math.random() * 75 + 5 : Math.random() * 80 + 5;
  const left = isMobile ? Math.random() * 45 + 5 : Math.random() * 60 + 5;
  const fontSize = isMobile ? '0.8rem' : '1.4rem';

  const text = lyrics[Math.floor(Math.random() * lyrics.length)];
  return { id: Date.now() + Math.random(), text, top, left, fontSize };
};

function FloatingLyrics() {
  const [floatingLyrics, setFloatingLyrics] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lyric = getRandomLyric();
      setFloatingLyrics((prev) => [...prev, lyric]);

      // 5秒後に消す
      setTimeout(() => {
        setFloatingLyrics((prev) => prev.filter((l) => l.id !== lyric.id));
      }, 5000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {floatingLyrics.map((lyric) => (
          <motion.div
            key={lyric.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: `${lyric.top}%`,
              left: `${lyric.left}%`,
              color: '#ffffff',
              fontSize: lyric.fontSize,
              fontWeight: 'bold',
              textShadow: '0 0 8px #fff',
              whiteSpace: 'nowrap',
            }}
          >
            {lyric.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FloatingLyrics;
