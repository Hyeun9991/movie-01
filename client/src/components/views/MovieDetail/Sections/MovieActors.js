import React, { useState } from 'react';
import styled from 'styled-components';
import { IMAGE_BASE_URL } from '../../../../Config';

function MovieActors({ Casts }) {
  const originActors = Casts.slice(1, 6);
  const moreActors = Casts.slice(6, -1);

  const [ActorToggle, setActorToggle] = useState(false);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <MovieActorsContainer>
      <SectionTitle>Actors</SectionTitle>
      <ActorList>
        {/* 기본값: 5명 */}
        {Casts && (
          <OriginActors>
            {originActors.map((originActor) => {
              return (
                <ActorItem key={originActor.id}>
                  <ProfileImageContainer>
                    <img
                      src={`${IMAGE_BASE_URL}w500${originActor.profile_path}`}
                      alt={originActor.name}
                    />
                  </ProfileImageContainer>
                  <ActorName>{originActor.name}</ActorName>
                </ActorItem>
              );
            })}
          </OriginActors>
        )}

        {/* 배우 더 보기 */}
        {ActorToggle && (
          <MoreActors>
            {Casts &&
              moreActors.map((cast) => {
                return (
                  <ActorItem key={cast.id}>
                    <ProfileImageContainer>
                      <img
                        src={`${IMAGE_BASE_URL}w500${cast.profile_path}`}
                        alt={cast.name}
                      />
                    </ProfileImageContainer>
                    <ActorName>{cast.name}</ActorName>
                  </ActorItem>
                );
              })}
          </MoreActors>
        )}

        {/* 더 보기 버튼 */}
        {!ActorToggle && (
          <MoreButton onClick={toggleActorView}>View all</MoreButton>
        )}
      </ActorList>
    </MovieActorsContainer>
  );
}

const MovieActorsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;
const SectionTitle = styled.h2`
  font-size: 18px;
  color: #fff;
  font-weight: normal;
  opacity: 0.7;
`;
const ActorList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;
const OriginActors = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const MoreActors = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const ActorItem = styled.div`
  width: 60px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
const ProfileImageContainer = styled.div`
  background-color: gray;
  width: 55px;
  height: 55px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;

  img {
    position: absolute;
    top: -0.5rem;
    left: 0;
    width: 100%;
    filter: grayscale(100%);
  }
`;
const ActorName = styled.p`
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 1rem;
  opacity: 0.7;
`;
const MoreButton = styled.button`
  background-color: #ffffff50;
  backdrop-filter: blur(4px);
  width: 55px;
  height: 55px;
  padding: 0.5rem;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  line-height: 1.1rem;
  color: #fff;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export default MovieActors;
