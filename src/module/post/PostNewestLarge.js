import React from "react";
import styled from "styled-components";
import newestLargeImg from "assets/images/newest-large-img.jpg";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  max-width: 570px;
  .post-img {
    height: 430px;
  }
  .post-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    display: flex;
    align-items: center;
    gap: 15px;
    color: #b1b5c3;
  }
  .post-dot {
    display: block;
    width: 6px;
    height: 6px;
    background-color: currentColor;
    border-radius: 999px;
  }
  .post-date,
  .post-author {
    font-weight: 600;
    font-size: 14px;
  }
`;
const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <div className="post-img">
        <img src={newestLargeImg} alt="" className="post-img" />
      </div>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle size="large">Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
      <div className="post-info">
        <span className="post-date">Mar 23</span>
        <span className="post-dot"></span>
        <span className="post-author">Andiez Le</span>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
