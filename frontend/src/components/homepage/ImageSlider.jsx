import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./slider.css";

const images = [
  "https://img.ananweb.jp/2020/07/04105639/30-600x466.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WYKhzAFBqN0nwDVz_F4wIdBofX3FSDnrRQ&s",
  "https://rockinon.com/images/entry/width:750/211469/1",
  "https://img.barks.jp/image/review/1000220442/1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0kTYNfKjLvklQDuq9KNuNjLOYlQvBQjjKg&s",
  "https://img.ananweb.jp/2020/07/04105639/30-600x466.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WYKhzAFBqN0nwDVz_F4wIdBofX3FSDnrRQ&s",
  "https://rockinon.com/images/entry/width:750/211469/1",
  "https://img.barks.jp/image/review/1000220442/1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0kTYNfKjLvklQDuq9KNuNjLOYlQvBQjjKg&s",
  "https://img.ananweb.jp/2020/07/04105639/30-600x466.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WYKhzAFBqN0nwDVz_F4wIdBofX3FSDnrRQ&s",
  "https://rockinon.com/images/entry/width:750/211469/1",
  "https://img.barks.jp/image/review/1000220442/1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0kTYNfKjLvklQDuq9KNuNjLOYlQvBQjjKg&s",
  "https://img.ananweb.jp/2020/07/04105639/30-600x466.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WYKhzAFBqN0nwDVz_F4wIdBofX3FSDnrRQ&s",
  "https://rockinon.com/images/entry/width:750/211469/1",
  "https://img.barks.jp/image/review/1000220442/1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0kTYNfKjLvklQDuq9KNuNjLOYlQvBQjjKg&s",
];

const ImageSlider = () => {
  // ループの滑らかさのために画像を倍に
  const loopedImages = images.concat(images);

  return (
    <div className="slider-container">
      <h2 className="slider-title">語ろ！つながろ！ハルカミライで！</h2>
      <p className="slider-description">
        「好き」がつながる。想いが残る。
        『ハルカミライ履歴書』は、あなたの“好き”をカタチにして共有できるファンアプリ。
        心に残った歌詞、ライブで感じた想い──
        あなただけの物語を、履歴書のように綴ってみませんか？
        オープンチャットでは、同じ想いを持つ仲間とつながることも。
        ファンが集まり、つながり、ハルカミライの熱が広がっていく。
      </p>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={16}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={8000} // ← 高くするとゆっくり（全体の移動にかかる時間）
        allowTouchMove={false}
        grabCursor={false}
        className="mySwiper"
      >
        {loopedImages.map((src, index) => (
          <SwiperSlide key={index} className="slide">
            <img src={src} alt={`album ${index}`} className="slide-img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={16}
        loop={true}
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
        {loopedImages.map((src, index) => (
          <SwiperSlide key={index} className="slide">
            <img src={src} alt={`album ${index}`} className="slide-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
