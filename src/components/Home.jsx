import React, { useEffect } from "react";

import styled from "styled-components";
import db from "../firebase";
import { ref, onValue } from "firebase/database";
import { useHistory } from "react-router-dom";

import { selectUserName } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Movies from "./Movies";

function Home() {
  const user = useSelector(selectUserName);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const allMovies = ref(db, "movies");
    return onValue(allMovies, (snapshot) => {
      const movies = snapshot.val();
      if (movies) {
        const newMoviesArr = movies.filter(
          (value) => Object.keys(value).length !== 0
        );
        dispatch(setMovies(newMoviesArr));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user, history]);

  return (
    user && (
      <Container>
        <ImgSlider />
        <Viewers />
        <Movies />
      </Container>
    )
  );
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow: hidden;

  &:before {
    background: url("/images/home-background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
