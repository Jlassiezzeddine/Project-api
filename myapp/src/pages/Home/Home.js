import React from "react";
import HeroCarousel from "../../Components/HeroCarousel/HeroCarousel";

const homePage = () => {
  return (
    <div
      style={{
        height: "300vh",
        backgroundColor: "#020916",
        paddingTop: "30px",
      }}
    >
      <HeroCarousel />
    </div>
  );
};

export default homePage;
