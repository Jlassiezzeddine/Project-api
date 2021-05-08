import React from "react";
import styled from "styled-components";
import { Rating } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
const Card = styled.div`
  background-color: #eeeeee;
  width: auto;
  height: 320px;
  border-radius: 0.5rem;
  overflow: hidden;
  background-image: url("https://images.unsplash.com/photo-1569389397653-c04fe624e663?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 2px 2px 9px 16px rgba(0, 0, 0, 0.08);
`;
const Content = styled.div`
  height: 100%;
  width: 100%;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.85) 53%,
    rgba(0, 0, 0, 0.8) 100%
  );
  transition: 0.2s;
  &:hover {
    opacity: 1;
    transition: 0.2s;
  }
`;

const MovieCard = () => {
  return (
    <Card>
      <RouterLink to="/register">
        <Content>
          <div style={{ margin: "1rem" }}>
            <Typography
              gutterBottom
              color="textPrimary"
              style={{ width: "100%" }}
              variant="h5"
            >
              Lorem ipsum dolor
            </Typography>
            <Rating name="read-only" value={3} readOnly />
          </div>
          <div style={{ margin: "1rem" }}>
            <Typography
              paragraph
              color="textPrimary"
              style={{ width: "100%" }}
              variant="h5"
            >
              From 15 $
            </Typography>
          </div>
        </Content>
      </RouterLink>
    </Card>
  );
};

export default MovieCard;
