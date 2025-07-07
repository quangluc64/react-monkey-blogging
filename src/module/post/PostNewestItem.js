import React from "react";
import styled from "styled-components";
import newestItemImg from "assets/images/newest-item-img.jpeg";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child{
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
    &-category {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #fff;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #6b6b6b;
    }
    &-title {
      margin-top: 10px;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
    }
    &-info {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
      color: #b1b5c3;
    }
    &-dot {
      display: block;
      width: 6px;
      height: 6px;
      background-color: currentColor;
      border-radius: 999px;
    }
    &-date,
    &-author {
      font-weight: 600;
      font-size: 14px;
    }
  }
`;
const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <div className="post-img">
        <img
          src={newestItemImg}
          alt=""
        />
      </div>
      <div className="post-content">
        <span className="post-category">Kiến thức</span>
        <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
        <div className="post-info">
          <span className="post-date">Mar 23</span>
          <span className="post-dot"></span>
          <span className="post-author">Andiez Le</span>
        </div>
      </div>
    </PostNewestItemStyles>
  );
};
export default PostNewestItem;
