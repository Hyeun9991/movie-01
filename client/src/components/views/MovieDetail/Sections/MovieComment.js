import React from 'react';
import styled from 'styled-components';

function MovieComment() {
  return (
    <MovieCommentContainer>
      <SectionTitle>Comments</SectionTitle>
      <CommentContainer>
        {/* Root Comment Form */}
        <RootCommentForm>
          <TextArea
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="댓글 작성..."
          ></TextArea>
          <SubmitButton>완료</SubmitButton>
        </RootCommentForm>

        {/* Comment List - 내림차순 */}
        <CommentList>
          {/* Single Comment */}
          {/* <SingleComment>
            <UserName>name</UserName>
            <CommentContent>comment content</CommentContent>
          </SingleComment>
          <SingleComment>
            <UserName>name</UserName>
            <CommentContent>comment content</CommentContent>
          </SingleComment>
          <SingleComment>
            <UserName>name</UserName>
            <CommentContent>comment content</CommentContent>
          </SingleComment> */}
        </CommentList>
      </CommentContainer>
    </MovieCommentContainer>
  );
}

const MovieCommentContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const CommentContainer = styled.div`
  background-color: #ffffff70;
  backdrop-filter: blur(14px);
  border-radius: 0.75rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: auto;
`;
const SectionTitle = styled.h2`
  font-size: 18px;
  color: #fff;
  font-weight: normal;
  opacity: 0.7;
`;
const RootCommentForm = styled.form`
  background-color: #ffffff20;
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  border-radius: 0.75rem;
  padding: 0.75rem;
`;
const TextArea = styled.textarea`
  background-color: transparent;
  resize: none;
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    color: #00000080;
  }
`;
const SubmitButton = styled.button`
  background-color: #000;
  border: none;
  border-radius: 0.35rem;
  font-size: 12px;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.3s;

  padding: 8px 14px;
  border-radius: 4px;

  &:hover {
    opacity: 1;
  }
`;
const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 14px; /*스크롤바의 너비*/
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff70;
    background-clip: padding-box;
    border: 0.25rem solid transparent;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /*스크롤바 트랙 색상*/
  }
`;
const SingleComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const UserName = styled.p`
  font-size: 12px;
  color: #fff;
  opacity: 0.7;
`;
const CommentContent = styled.p`
  font-size: 14px;
  color: #fff;
`;

export default MovieComment;
