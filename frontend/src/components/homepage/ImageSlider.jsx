import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './slider.css';

const images1 = [
  'images/ジャケ写 (9).png',
  'images/ジャケ写 (1).png',
  'images/ジャケ写 (17).png',
  'images/ジャケ写 (13).png',
  'images/ジャケ写 (8).png',
  'images/ジャケ写 (10).png',
  'images/ジャケ写 (15).png',
  'images/ジャケ写 (22).png',
  'images/ジャケ写 (12).png',
  'images/ジャケ写 (7).png',
  'images/ジャケ写 (2).png',
  'images/ジャケ写 (21).png',
  'images/ジャケ写 (3).png',
  'images/ジャケ写 (4).png',
  'images/ジャケ写 (6).png',
  'images/ジャケ写 (18).png',
  'images/ジャケ写 (14).png',
  'images/ジャケ写 (11).png',
  'images/ジャケ写 (5).png',
  'images/ジャケ写 (20).png',
  'images/ジャケ写 (19).png',
  'images/ジャケ写 (16).png',
];

const images2 = [
  'images/ジャケ写 (11).png',
  'images/ジャケ写 (21).png',
  'images/ジャケ写 (6).png',
  'images/ジャケ写 (14).png',
  'images/ジャケ写 (2).png',
  'images/ジャケ写 (9).png',
  'images/ジャケ写 (10).png',
  'images/ジャケ写 (7).png',
  'images/ジャケ写 (13).png',
  'images/ジャケ写 (3).png',
  'images/ジャケ写 (12).png',
  'images/ジャケ写 (5).png',
  'images/ジャケ写 (1).png',
  'images/ジャケ写 (22).png',
  'images/ジャケ写 (20).png',
  'images/ジャケ写 (16).png',
  'images/ジャケ写 (17).png',
  'images/ジャケ写 (4).png',
  'images/ジャケ写 (8).png',
  'images/ジャケ写 (19).png',
  'images/ジャケ写 (18).png',
  'images/ジャケ写 (15).png',
];

function ImageSlider() {
  // ループの滑らかさのために画像を倍に
  const loopedImages1 = images1.concat(images1);
  const loopedImages2 = images2.concat(images2);

  return (
    <div className="slider-container">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={8000} // ← 高くするとゆっくり（全体の移動にかかる時間）
        allowTouchMove={false}
        grabCursor={false}
        className="mySwiper"
      >
        {loopedImages1.map((src, index) => (
          <SwiperSlide key={index} className="slide">
            <img src={src} alt={`album ${index}`} className="slide-img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="slider-content">
        <h2 className="slider-title">語ろ！つながろ！ハルカミライで！</h2>
        <p className="slider-description">
          「好き」がつながる。想いが残る。
          『ハルカミライ履歴書』は、あなたの“好き”をカタチにして共有できるファンアプリ。
          心に残った歌詞、ライブで感じた想い── あなただけの物語を、履歴書のように綴ってみませんか？
          オープンチャットでは、同じ想いを持つ仲間とつながることも。
          ファンが集まり、つながり、ハルカミライの熱が広がっていく。
        </p>
      </div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={8000} // ← 高くするとゆっくり（全体の移動にかかる時間）
        allowTouchMove={false}
        grabCursor={false}
        className="mySwiper"
        dir="rtl"
      >
        {loopedImages2.map((src, index) => (
          <SwiperSlide key={index} className="slide">
            <img src={src} alt={`album ${index}`} className="slide-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
