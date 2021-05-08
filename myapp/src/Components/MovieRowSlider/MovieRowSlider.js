import {
  ThemeProvider,
  Typography,
  Container,
  Icon,
  IconButton,
} from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { theme } from "../../theme";
import MovieCard from "../MovieCard/MovieCard";
import styled from "styled-components";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const CustomNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #eee;
  width: 70px;

  margin-right: 1rem;
  & > * :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const MovieRowSlider = ({ title, movieArray }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <ThemeProvider theme={theme}>
      ¨
      <Container maxWidth="lg" style={{ marginTop: "1rem" }}>
        <Top>
          <Typography variant="h4" color="secondary">
            {title}
          </Typography>
          <CustomNavigation>
            <IconButton style={{ color: "#eee" }}>
              <ArrowBackIosIcon ref={navigationPrevRef} />
            </IconButton>
            <IconButton style={{ color: "#eee" }}>
              <ArrowForwardIosIcon ref={navigationNextRef} />
            </IconButton>
          </CustomNavigation>
        </Top>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 3,
            },
            960: {
              slidesPerView: 5,
            },
            1440: {
              slidesPerView: 6,
            },
            1920: {
              slidesPerView: 7,
            },
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          loop={true}
          spaceBetween={30}
          style={{ marginTop: "2rem" }}
        >
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
        </Swiper>
      </Container>
    </ThemeProvider>
  );
};

export default MovieRowSlider;
