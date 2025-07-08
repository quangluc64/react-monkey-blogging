import React from "react";
import styled from "styled-components";
import postItemImg from "assets/images/post-item-img.jpeg";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
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
      <div className="post-img">
        <img src={postItemImg} alt="" className="post-img" />
      </div>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta></PostMeta>
    </PostItemStyles>
  );
};
export default PostItem;
