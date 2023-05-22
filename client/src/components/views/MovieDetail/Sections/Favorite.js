import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';

function Favorite({ movieInfo, movieId, userFrom }) {
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  useEffect(() => {
    // 해당 영화의 Favorite 개수 데이터 구하기
    let favoriteVariable = {
      userFrom,
      movieId,
    };

    axios
      .post('/api/favorite/favoriteNumber', favoriteVariable)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
        } else {
          alert('Favorite 데이터를 가져오는데 실패 했습니다.');
        }
      });
  }, []);

  return (
    <FavoriteButton>
      <AiOutlineHeart className="icon" />
    </FavoriteButton>
  );
}

const FavoriteButton = styled.button`
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

    .icon {
      color: red;
    }
  }

  .icon {
    font-size: 22px;
  }
`;

export default Favorite;
