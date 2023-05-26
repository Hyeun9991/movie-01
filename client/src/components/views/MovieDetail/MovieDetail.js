import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config';
import styled from 'styled-components';
import MovieInfo from './Sections/MovieInfo';
import FullImage from '../commons/FullImage';
import { BsArrowLeftShort } from 'react-icons/bs';
import Favorite from './Sections/Favorite';
import MovieActors from './Sections/MovieActors';
import MovieComment from './Sections/MovieComment';

function MovieDetail() {
  const { movieId } = useParams(); // url에서 :movieId 가져오기
  const navigate = useNavigate();

  const [Movie, setMovie] = useState([]); // 모든 영화 데이터 리스트
  const [Casts, setCasts] = useState([]); // 모든 출연진 데이터 리스트

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;

    // Movie Info
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    // Actors Info
    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });
  }, []);

  // 바로 이전 페이지로 이동
  const backButton = () => {
    navigate(-1);
  };

  return (
    <Container>
      <FullImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}>
        {/* Movie Navbar */}
        <MovieNav>
          <BackButton onClick={backButton}>
            <BsArrowLeftShort className="icon" />
          </BackButton>

          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem('userId')}
          />
        </MovieNav>

        {/* Left Section - Movie Info */}
        <LeftSection className="left-section">
          <MovieInfo movie={Movie} />
        </LeftSection>

        {/* Right Section - Movie Actors & Movie Comments */}
        <RightSection className="right-section">
          <MovieComment />

          <MovieActors Casts={Casts} />
        </RightSection>
      </FullImage>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;
const MovieNav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 3rem;
`;
const LeftSection = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 3rem;
`;
const RightSection = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 3rem;
`;
const BackButton = styled.button`
  background-color: #ffffff30;
  backdrop-filter: blur(4px);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;

  .icon {
    color: #fff;
    font-size: 32px;
  }

  &:hover {
    background-color: #000;
    color: #fff;
    scale: 1.05;

    .icon {
      color: #ff0048;
    }
  }
`;

export default MovieDetail;
