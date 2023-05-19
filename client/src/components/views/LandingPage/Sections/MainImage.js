import React from 'react';
import styled from 'styled-components';

function MainImage({ image, title, text }) {
  return (
    <MainImageContainer image={image}>
      <div>
        <InfoContainer>
          <MovieTitle>{title}</MovieTitle>
          <MovieDescription>{text}</MovieDescription>
        </InfoContainer>
      </div>
    </MainImageContainer>
  );
}

const MainImageContainer = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 39%,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%,
      #1c1c1c
    ),
    url(${(props) => props.image});
  background-size: 100%, cover;
  background-position: center, center;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  position: relative;
`;
const InfoContainer = styled.div`
  position: absolute;
  max-width: 500px;
  bottom: 2rem;
  margin-left: 2rem;
`;
const MovieTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  margin-bottom: 0.5rem;
`;
const MovieDescription = styled.p`
  color: #fff;
  font-size: 1rem;
  font-size: 14px;
  line-height: 1.3rem;
  opacity: 0.7;
`;

export default MainImage;
