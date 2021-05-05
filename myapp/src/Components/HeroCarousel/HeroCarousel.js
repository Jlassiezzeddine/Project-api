import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import HeroCarouselItem from "./HeroCarouselItem";

const HeroCarousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide style={{ width: "80vw" }}>
        <HeroCarouselItem />
      </SwiperSlide>
      <SwiperSlide style={{ width: "80vw" }}>
        <HeroCarouselItem />
      </SwiperSlide>
      <SwiperSlide style={{ width: "80vw" }}>
        <HeroCarouselItem />
      </SwiperSlide>
      <SwiperSlide style={{ width: "80vw" }}>
        <HeroCarouselItem />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
