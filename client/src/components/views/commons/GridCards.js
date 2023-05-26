import React from 'react';
import styled from 'styled-components';

function GridCards({
  landingPage,
  firstActor,
  image,
  movieId,
  movieName,
  MoreCharacterName,
  firstCharacterName,
}) {
  if (landingPage) {
    return (
      // Movie col
      <ColContainer>
        <a href={`/movie/${movieId}`}>
          <MovieImage src={image} alt={movieName} />
        </a>
      </ColContainer>
    );
  } else if (firstActor) {
    return (
      // first Actors
      <FirstActorContainer className="actor-item">
        <ActorProfileImageContainer>
          <ActorProfileImage src={image} alt={firstCharacterName} />
        </ActorProfileImageContainer>
        <ActorName>{firstCharacterName}</ActorName>
      </FirstActorContainer>
    );
  } else {
    return (
      // Actor col
      <MoreActorContainer className="actor-item">
        <ActorProfileImageContainer>
          <ActorProfileImage src={image} alt={firstCharacterName} />
        </ActorProfileImageContainer>
        <ActorName>{MoreCharacterName}</ActorName>
      </MoreActorContainer>
    );
  }
}

const ColContainer = styled.div`
  flex: 0 0 25%; /* lg */
  max-width: 25%;

  @media (max-width: 992px) {
    /* md */
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }

  @media (max-width: 576px) {
    /* xs */
    flex: 0 0 100%;
    max-width: 100%;
  }
`;
const MovieImage = styled.img`
  width: 100%;
  min-height: 310px;
  height: auto;
  border-radius: 0.75rem;
`;
const FirstActorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 60px;
`;
const MoreActorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 60px;
  flex-wrap: wrap;
`;
const ActorProfileImageContainer = styled.div`
  background-color: #ddd;
  width: 55px;
  height: 55px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`;
const ActorProfileImage = styled.img`
  position: absolute;
  top: -0.5rem;
  left: 0;
  width: 100%;
  filter: grayscale(100%);
`;
const ActorName = styled.span`
  font-size: 12px;
  color: #fff;
  line-height: 1rem;
  text-align: center;
  opacity: 0.8;
  width: 80%;
`;

export default GridCards;
