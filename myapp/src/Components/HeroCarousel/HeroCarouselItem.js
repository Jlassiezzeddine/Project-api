import { ThemeProvider, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";
const CarouselItem = styled.div`
  position: relative;
  min-height: 350px;
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
  align-items: flex-start;
  padding: 0 5rem;
  color: #eeeeee;
`;

const ButtonsArea = styled.div`
  display: flex;
  width: auto;
  margin-top: 1.5rem;
`;
const TrailerButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  color: #eeeeee;
  width: fit-content;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 1.2rem;
  margin-right: 1rem;
  transition: 0.2s ease-out;
  span {
    margin-right: 0.5rem;
  }
  &:hover {
    color: #ffbb00;
    transition: 0.2s ease-in;
  }
`;
const CallToAction = styled.button`
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: fit-content;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 2px;
  background-color: #eeeeee;
  cursor: pointer;
  margin-right: 1rem;
  transition: 0.2s ease-out;
  span {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
  &:hover {
    background-color: #ffbb00;
    transition: 0.2s ease-in;
  }
`;
const HeroCarouselItem = ({ isActive }) => {
  return (
    <ThemeProvider theme={theme}>
      <CarouselItem>
        <CarouselItemContent>
          {isActive && (
            <>
              <Typography variant="h6">highlights</Typography>
              <Typography variant="h2">John Wick:</Typography>
              <Typography variant="h3">Chapter 3 - Parabellum</Typography>
              <Typography variant="h5">Action | Thriller - 2h 12min</Typography>
              <ButtonsArea>
                <TrailerButton>
                  <Icon>play_circle_outline</Icon>
                  <span>watch trailer</span>
                </TrailerButton>
                <CallToAction>
                  <span>book now !</span>
                  <ConfirmationNumberOutlinedIcon />
                </CallToAction>
              </ButtonsArea>
            </>
          )}
        </CarouselItemContent>
      </CarouselItem>
    </ThemeProvider>
  );
};

export default HeroCarouselItem;
