import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config';
import styled from 'styled-components';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import FullImage from '../commons/FullImage';

function MovieDetail() {
  const { movieId } = useParams(); // url에서 :movieId 가져오기

  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    // let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;

    // Movie API에서 가져온 데이터를 Movie state에 넣기
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });
  }, []);

  return (
    <Container>
      {/* Header */}

      {/* Body */}
      <FullImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}>
        <MovieInfoContainer>
          {/* Movie Info */}
          <MovieInfo movie={Movie} />

          {/* Actors Grid */}
          <ActorsContainer>
            <ActorTitle>Actors</ActorTitle>
            <ToggleActorButton>View all</ToggleActorButton>
          </ActorsContainer>
        </MovieInfoContainer>
      </FullImage>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;
const MovieInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  gap: 5rem;
`;
const ActorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 50%;
`;
const ActorTitle = styled.h2`
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`;
const ToggleActorButton = styled.button`
  background-color: #ffffff30;
  backdrop-filter: blur(4px);
  opacity: 0.7;
  color: #fff;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.15rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #000;
    color: #fff;
    scale: 1.05;
  }
`;

export default MovieDetail;
