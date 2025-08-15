import React from "react";
import styled from "styled-components";
import homeNewestLargeImg from "assets/images/home-newest-large.jpg";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "react-slugify";
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
const PostNewestLarge = ({ data }) => {
  if (!data?.id) return;
  const date = new Date(data.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestLargeStyles>
      <PostImage to={data?.slug} url={data?.image}></PostImage>
      <PostCategory to={data?.category?.slug}>{data?.category?.name}</PostCategory>
      <PostTitle to={data?.slug} size="large">{data.title}</PostTitle>
      <PostMeta
        to={slugify(data?.user?.username)}
        author={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
