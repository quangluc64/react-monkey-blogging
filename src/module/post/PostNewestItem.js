import React from "react";
import styled from "styled-components";
import newestItemImg from "assets/images/newest-item-img.jpeg";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-img {
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 80%;
        border-radius: 12px;
      }
    }
    &-title {
      margin-top: 10px;
    }
    &-info {
      margin-top: 10px;
    }
  }
`;
const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <div className="post-img">
        <img src={newestItemImg} alt="" />
      </div>
      <div className="post-content">
        <PostCategory type="secondary">Kiến thức</PostCategory>
        <PostTitle>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <PostMeta></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};
export default PostNewestItem;
