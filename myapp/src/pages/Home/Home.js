import React from "react";
import HeroCarousel from "../../Components/HeroCarousel/HeroCarousel";
import MovieRowSlider from "../../Components/MovieRowSlider/MovieRowSlider";

const homePage = () => {
  return (
    <div
      style={{
        backgroundColor: "#020916",
        padding: "2rem 0",
      }}
    >
      <HeroCarousel />
      <MovieRowSlider title={"This Week"} />
      <MovieRowSlider title={"Action"} />
    </div>
  );
};

export default homePage;
