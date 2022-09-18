import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { child, get, ref } from "firebase/database";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    //Grab movie info from DB
    const getMovieDetail = async () => {
      const dbRef = ref(db);
      try {
        await get(child(dbRef, `movies/${id}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setMovie(snapshot.val());
          } else setMovie({});
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMovieDetail();
  }, [id]);

  const genre = movie?.genre.filter((m) => Object.keys(m).length !== 0);

  return (
    <Container>
      {movie && (
        <>
          <Background>
            <img src={movie.url} alt={movie.title} />
          </Background>

          <ImgTitle>
            <img src={movie.url} alt={movie.title} />
          </ImgTitle>

          <Controls>
            <PlayBtn>
              <img src="/images/play-icon-black.png" alt="" />
              <span>Play</span>
            </PlayBtn>

            <TrailerBtn>
              <img src="/images/play-icon-white.png" alt="" />
              <span>Trailer</span>
            </TrailerBtn>

            <AddBtn>
              <span>+</span>
            </AddBtn>

            <GroupWatchBtn>
              <img src="/images/group-icon.png" alt="" />
            </GroupWatchBtn>
          </Controls>

          <Title>{movie.title}</Title>

          <GenreBlock>
            {genre.map((g) => (
              <MovieGenre>{g.name}</MovieGenre>
            ))}
          </GenreBlock>

          <Description>{movie.description}</Description>
        </>
      )}
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.5;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ImgTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;
  margin-top: 60px;
  margin-bottom: 30px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayBtn = styled.button`
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 50px;
  background: rgb(249, 249, 249);
  padding: 0 24px;
  margin-right: 22px;
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const TrailerBtn = styled(PlayBtn)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddBtn = styled.button`
  margin-right: 22px;
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgb(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    font-size: 30px;
    color: white;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const GroupWatchBtn = styled(AddBtn)`
  background-color: rgb(0, 0, 0, 0.6);
`;

const Title = styled.div`
  color: rgb(249, 249, 249);
  font-size: 25px;
  letter-spacing: 0.05em;
  min-height: 20px;
  margin-top: 26px;
`;

const GenreBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const MovieGenre = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0.05em;
  color: rgb(249, 249, 249);
  margin-block: 10px 20px;
  background: rgba(249, 249, 249, 0);
  border: solid 1.75px #fff;
  padding: 2px 5px;
  border-radius: 4px;
`;

const Description = styled.div`
  line-height: 1.5;
  font-size: 16px;
  margin-top: 16px;
  letter-spacing: 0.05em;
  color: rgb(249, 249, 249);
  max-width: 760px;
`;
