import React from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

function MovieInfo({ movie }) {
  const movieTitle = movie.title;
  const movieDescription = movie.overview;
  const runTime = movie.runtime;
  const releaseDate = movie.release_date;
  const voteAverage = movie.vote_average;
  const voteCount = movie.vote_count;
  const movieGenres = movie.genres && movie.genres.map((genre) => genre.name);

  return (
    <Container className="movie-info-container">
      <MovieTitle>{movieTitle}</MovieTitle>
      <DetailContainer>
        <VoteContainer>
          <VoteAverage>
            <AiFillStar className="icon" />
            {voteAverage}
          </VoteAverage>
          <VoteCount>{voteCount}</VoteCount>
        </VoteContainer>
        <InfoList>
          <InfoItem>
            <InfoText>{runTime}m</InfoText>
          </InfoItem>
          <InfoItem>
            {movieGenres &&
              movieGenres.map((genre) => {
                return <InfoText key={genre}>{genre}</InfoText>;
              })}
          </InfoItem>
          <InfoItem>
            <InfoText>{releaseDate}</InfoText>
          </InfoItem>
        </InfoList>
      </DetailContainer>
      <InfoText>{movieDescription}</InfoText>
    </Container>
  );
}

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const MovieTitle = styled.h1`
  font-size: 45px;
`;

const DetailContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const VoteAverage = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .icon {
    color: #f9bc2d;
  }
`;
const VoteCount = styled.span`
  font-size: 14px;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -0.5rem;
    background-color: #fff;
    width: 0.1rem;
    height: 80%;
    opacity: 0.7;
    transform: translateY(-50%);
  }
`;

const InfoList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1rem;
`;
const InfoItem = styled.li`
  display: flex;
  gap: 0.5rem;
`;
const InfoText = styled.span`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.2rem;
`;

export default MovieInfo;
