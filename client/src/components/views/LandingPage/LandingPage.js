import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;

    // 현재 인기있는 영화 20개 데이터 가져오기
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...response.results]);
        setMainMovieImage(response.results[0]);
      });
  }, []);

  return (
    <Container>
      {/* Main Image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.title}
          text={MainMovieImage.overview}
        />
      )}

      <MainMoviesContainer>
        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}
        <RowContainer>
          {Movies &&
            Movies.map((movie) => {
              return (
                <React.Fragment key={movie.id}>
                  <GridCards
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.title}
                  />
                </React.Fragment>
              );
            })}
        </RowContainer>
      </MainMoviesContainer>

      <LoadMoreButtonContainer>
        <LoadMoreButton>Load More</LoadMoreButton>
      </LoadMoreButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const MainMoviesContainer = styled.div`
  width: 85%;
  margin: 1rem auto;
`;
const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const LoadMoreButton = styled.button``;
const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -8px; /* gutter 간격의 음수 margin 값 */

  & > div {
    padding: 8px; /* gutter 간격의 padding 값 */
  }
`;

export default LandingPage;
