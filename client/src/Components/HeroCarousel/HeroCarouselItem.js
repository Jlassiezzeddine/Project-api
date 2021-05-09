import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
const HeroCarouselItem = () => {
  const CarouselItem = styled.div`
    position: relative;
    min-height: 400px;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1588189629354-6d0385b3d5ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 2px;
  `;
  const CarouselItemContent = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const ButtonsArea = styled.div`
    display: flex;
  `;
  return (
    <CarouselItem>
      <CarouselItemContent>
        <Typography variant="h6">highlights</Typography>
        <Typography variant="h2">John Wick: Chapter 3 - Parabellum</Typography>
        <Typography variant="h5">Action | Thriller - 2h 12min</Typography>
        <ButtonsArea>
          <button>s</button>
          <button>k</button>
        </ButtonsArea>
      </CarouselItemContent>
    </CarouselItem>
  );
};

export default HeroCarouselItem;
