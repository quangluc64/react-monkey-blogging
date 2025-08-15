import React from "react";
import styled from "styled-components";
import homeNewestItemImg from "assets/images/home-newest-item.jfif";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "react-slugify";
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
      border-radius: 12px;
      img {
        object-position: center 80%;
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
const PostNewestItem = ({ data }) => {
  if (!data?.id) return;
  const date = new Date(data.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestItemStyles>
      <PostImage to={data?.slug} url={data?.image}></PostImage>
      <div className="post-content">
        <PostCategory to={data?.category?.slug} type="secondary">{data?.category?.name}</PostCategory>
        <PostTitle to={data?.slug}>{data?.title}</PostTitle>
        <PostMeta
          to={slugify(data?.user?.username)}
          author={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};
export default PostNewestItem;
