import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config';
import GridCards from '../commons/GridCards';
import MainImage from '../commons/MainImage';
import Layout from '../../Layout/Layout';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // load되자마자 첫 번째 페이지(page=1)를 파라미터로 줌
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    // 현재 인기있는 영화 20개 데이터 가져오기
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // ...: 리스트 내부에 있는 element들을 풀어주는 연산자
        // setMovies([...response.results]); // 덮어씌움 (lead more 버튼을 눌러서 데이터를 가져와도 기존 데이터에 덮어씌인다.)
        setMovies([...Movies, ...response.results]); // 두 리스트를 순서대로 합침

        // 첫 번째 페이지의 첫 번째 영화 포스터 이미지로 MainMovie State Update
        if (response.page === 1) {
          setMainMovieImage(response.results[0]);
        }

        setCurrentPage(response.page); // 기본값: 1
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <Layout>
      <Container>
        {/* Main Image */}
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage?.backdrop_path}`}
            title={MainMovieImage.title}
            text={MainMovieImage.overview}
          />
        )}

        <MainMoviesContainer>
          <SectionTitle>Movies by latest</SectionTitle>

          {/* Movie Grid Cards */}
          <RowContainer>
            {Movies &&
              Movies.map((movie) => {
                return (
                  <React.Fragment key={movie.id}>
                    <GridCards
                      landingPage
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
          <LoadMoreButton onClick={loadMoreItems}>Load More</LoadMoreButton>
        </LoadMoreButtonContainer>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, white 80%, black);
`;
const MainMoviesContainer = styled.div`
  width: 85%;
  margin: 3rem auto;
`;
const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 1rem;
`;
const LoadMoreButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;
const LoadMoreButton = styled.button`
  border: none;
  outline: none;
  padding: 0.9rem 1.2rem;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  cursor: pointer;
  margin-bottom: 3rem;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -8px; /* gutter 간격의 음수 margin 값 */

  & > div {
    padding: 8px; /* gutter 간격의 padding 값 */
  }
`;

export default LandingPage;
