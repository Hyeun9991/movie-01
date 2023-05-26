import React from 'react';
import styled from 'styled-components';

function FullImage({ image, children }) {
  return <FullImageContainer image={image}>{children}</FullImageContainer>;
}

const FullImageContainer = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 21%,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.7) 100%,
      #1c1c1c
    ),
    url(${(props) => props.image});
  background-size: 100%, cover;
  background-position: center, center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export default FullImage;
