import React from 'react';
import styled from 'styled-components';

function GridCards({ image, movieId, movieName }) {
  return (
    <ColContainer>
      <GridItem>
        <a href={`/movie/${movieId}`}>
          <MovieImage src={image} alt={movieName} />
        </a>
      </GridItem>
    </ColContainer>
  );
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
const GridItem = styled.div`
  /* position: relative; */
`;
const MovieImage = styled.img`
  width: 100%;
  min-height: 310px;
  height: auto;
  border-radius: 0.75rem;
`;

export default GridCards;
