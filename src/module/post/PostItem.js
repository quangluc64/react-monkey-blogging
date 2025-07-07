import React from "react";
import styled from "styled-components";
import postItemImg from "assets/images/post-item-img.jpeg";
const PostItemStyles = styled.div`
  /* max-width: 270px; */
  font-family: "Montserrat", sans-serif;
  .post-img {
    width: 100%;
    height: 200px;
  }
  .post-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  .post-category {
    display: inline-block;
    margin-top: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #f3edff;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #6b6b6b;
  }
  .post-title {
    margin-top: 15px;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
  .post-info {
    margin-top: 15px;
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
const PostItem = () => {
  return (
    <PostItemStyles>
      <div className="post-img">
        <img src={postItemImg} alt="" className="post-img" />
      </div>
      <span className="post-category">Kiến thức</span>
      <h3 className="post-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </h3>
      <div className="post-info">
        <span className="post-date">Mar 23</span>
        <span className="post-dot"></span>
        <span className="post-author">Andiez Le</span>
      </div>
    </PostItemStyles>
  );
};
export default PostItem;
