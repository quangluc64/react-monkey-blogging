import React from "react";
import styled from "styled-components";
import newestLargeImg from "assets/images/newest-large-img.jpg";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
const PostNewestLargeStyles = styled.div`
  /* max-width: 570px; */
  .post-img {
    height: 430px;
    border-radius: 20px;
  }
  .post-category {
    margin-top: 25px;
  }
  .post-title {
    margin-top: 10px;
  }
  .post-info {
    margin-top: 10px;
  }
`;
const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <PostImage url={newestLargeImg}></PostImage>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle size="large">Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
      <PostMeta></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
