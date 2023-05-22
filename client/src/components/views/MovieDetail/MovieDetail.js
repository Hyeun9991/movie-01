import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config';
import styled from 'styled-components';
import MovieInfo from './Sections/MovieInfo';
import FullImage from '../commons/FullImage';
import GridCards from '../commons/GridCards';
import { BsArrowLeftShort } from 'react-icons/bs';

function MovieDetail() {
  const { movieId } = useParams(); // url에서 :movieId 가져오기
  const navigate = useNavigate();

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const firstActors = Casts.slice(1, 6);
  const moreActors = Casts.slice(6, -1);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;

    // Movie Info
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });

    // Actors Info
    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log('casts', response.cast);
        setCasts(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  // 바로 이전 페이지로 이동
  const backButton = () => {
    navigate(-1);
  };

  return (
    <Container>
      {/* Header */}
      <BackButton onClick={backButton}>
        <BsArrowLeftShort className="icon" />
      </BackButton>

      {/* Body */}
      <FullImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}>
        <MovieInfoContainer>
          {/* Movie Info */}
          <MovieInfo movie={Movie} />

          {/* Actors Grid */}
          <ActorsContainer>
            <ActorTitle>Actors</ActorTitle>
            <ActorList>
              {/* 기본값: 다섯명 */}
              {Casts && (
                <FirstActors>
                  {firstActors.map((firstActor) => {
                    return (
                      <React.Fragment key={firstActor.id}>
                        <GridCards
                          firstActor
                          image={
                            firstActor.profile_path
                              ? `${IMAGE_BASE_URL}w500${firstActor.profile_path}`
                              : null
                          }
                          firstCharacterName={firstActor.name}
                        />
                      </React.Fragment>
                    );
                  })}
                </FirstActors>
              )}
              {/* 배우 목록 더 보기 */}
              {ActorToggle && (
                <MoreActors>
                  {Casts &&
                    moreActors.map((cast) => {
                      return (
                        <React.Fragment key={cast.id}>
                          <GridCards
                            image={
                              cast.profile_path
                                ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                                : null
                            }
                            MoreCharacterName={cast.name}
                          />
                        </React.Fragment>
                      );
                    })}
                </MoreActors>
              )}
              {!ActorToggle && (
                <ToggleActorButton onClick={toggleActorView}>
                  View all
                </ToggleActorButton>
              )}
            </ActorList>
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
  padding: 2rem;
  gap: 4rem;
`;
const ActorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 1rem;
  padding: 1rem;
`;
const ActorList = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  overflow: scroll;
  /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;
const ActorTitle = styled.h2`
  font-size: 28px;
  font-weight: 400;
  color: #fff;
`;
const FirstActors = styled.div`
  display: flex;
  gap: 1rem;
`;
const MoreActors = styled.div`
  display: flex;
  gap: 1rem;
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
const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 3rem;
  background-color: #ffffff30;
  backdrop-filter: blur(4px);
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

  .icon {
    font-size: 32px;
  }
`;

export default MovieDetail;
