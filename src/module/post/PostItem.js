import React from "react";
import styled from "styled-components";
import postListItemImg from "assets/images/post-list-item.png";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
const PostItemStyles = styled.div`
  /* max-width: 270px; */
  font-family: "Montserrat", sans-serif;
  .post-img {
    width: 100%;
    height: 200px;
    border-radius: 20px;
  }
  .post-category {
    margin-top: 20px;
  }
  .post-title {
    margin-top: 15px;
  }
  .post-info {
    margin-top: 15px;
  }
`;
const PostItem = () => {
  return (
    <PostItemStyles>
      <PostImage url={postListItemImg}></PostImage>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta></PostMeta>
    </PostItemStyles>
  );
};
export default PostItem;
