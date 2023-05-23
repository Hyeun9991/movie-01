import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import styled from 'styled-components';
import axios from 'axios';
import { IMAGE_BASE_URL } from '../../../Config';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios
      .post('/api/favorite/getFavoredMovie', {
        userFrom: localStorage.getItem('userId'),
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setFavorites(response.data.favorites);
        } else {
          alert('좋아요한 영화 데이터를 가져오는데 실패했습니다.');
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    axios
      .post('/api/favorite/removeFromFavorite', variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert('Favorite 리스트에서 삭제하는데 실패했습니다.');
        }
      });
  };

  const renderCards = Favorites.map((favorite) => {
    const moviePost = (
      <div>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}
            alt={favorite.movieTitle}
          />
        ) : (
          'no image'
        )}
      </div>
    );

    return (
      <tr key={favorite.movieId}>
        <td>{moviePost}</td>
        <td>{favorite.movieTitle}</td>
        <td>{favorite.movieRunTime}분</td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  });

  return (
    <Layout>
      <Container>
        <h2>좋아요한 영화</h2>

        <Table>
          <thead>
            <tr>
              <th>포스터</th>
              <th>영화 제목</th>
              <th>시간</th>
              <th>좋아요 취소</th>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </Table>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 85%;
  min-height: 100vh;
  margin: 3rem auto;
`;
const Table = styled.table`
  font-family: 'Roboto', 'Arial', sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #ddd;
  }
`;

export default FavoritePage;
