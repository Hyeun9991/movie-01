import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';

function Favorite({ movieInfo, movieId, userFrom }) {
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.poster_path;
  const movieRunTime = movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favored, setFavored] = useState(false);

  let favoriteVariable = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    // 해당 영화의 Favorite 개수 데이터 구하기
    axios
      .post('/api/favorite/favoriteNumber', favoriteVariable)
      .then((response) => {
        if (response.data.success) {
          console.log('favoriteNumber', response.data);
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('Favorite Number 데이터를 가져오는데 실패 했습니다.');
        }
      });

    // 유저가 해당 영화를 favorite 리스트에 넣었는지 데이터 구하기
    axios.post('/api/favorite/favored', favoriteVariable).then((response) => {
      if (response.data.success) {
        console.log('favored', response.data);
        setFavored(response.data.favored);
      } else {
        alert('Favorite 데이터를 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favored) {
      axios
        .post('/api/favorite/removeFromFavorite', favoriteVariable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavored(!Favored);
          } else {
            alert('Favorite 리스트에서 삭제하는데 실패했습니다.');
          }
        });
    } else {
      axios
        .post('/api/favorite/addToFavorite', favoriteVariable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavored(!Favored);
          } else {
            alert('Favorite 리스트에 추가하는데 실패했습니다.');
          }
        });
    }
  };

  return (
    <FavoriteButtonContainer>
      <FavoriteButton
        className={Favored ? 'favored-btn' : ''}
        onClick={onClickFavorite}
      >
        {Favored ? (
          <AiFillHeart className="icon favored-icon" />
        ) : (
          <AiOutlineHeart className="icon" />
        )}
      </FavoriteButton>

      <FavoriteNumberText>
        {FavoriteNumber === 0 ? '' : FavoriteNumber}
      </FavoriteNumberText>
    </FavoriteButtonContainer>
  );
}

const FavoriteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;
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
      color: #ff0048;
    }
  }

  .icon {
    font-size: 24px;
    transition: all 0.3s;

    &.favored-icon {
      color: #ff0048;
    }
  }
`;
const FavoriteNumberText = styled.span`
  color: #fff;
  font-size: 12px;
  z-index: 1;
  opacity: 0.7;
  position: absolute;
  bottom: -0.3rem;
  left: 50%;
  transform: translateX(-50%);
`;
export default Favorite;
