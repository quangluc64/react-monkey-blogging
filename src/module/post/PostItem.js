import React from "react";
import styled from "styled-components";
// import postListItemImg from "assets/images/post-list-item.png";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "react-slugify";
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
const PostItem = ({ data }) => {
  if(!data) return;
  console.log("data ~", data);
  const date = new Date(data.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles>
      <PostImage url={data?.image}></PostImage>
      <PostCategory>{data?.category?.name}</PostCategory>
      <PostTitle>{data?.title}</PostTitle>
      <PostMeta
        to={slugify(data.user?.fullname)}
        author={data.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostItemStyles>
  );
};
export default PostItem;
