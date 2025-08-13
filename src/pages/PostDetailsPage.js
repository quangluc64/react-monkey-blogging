import Layout from "components/layout/Layout";
import PostImage from "module/post/PostImage";
import React, { useEffect, useState } from "react";
import PostCategory from "module/post/PostCategory";
import PostMeta from "module/post/PostMeta";
// import postDetailMain from "assets/images/post-detail-main.jfif";
// import postDetailSub from "assets/images/post-detail-sub.jfif";
// import postDetailAuthor from "assets/images/post-detail-author.jpeg";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import parse from "html-react-parser";
import slugify from "react-slugify";
import PostAuthor from "module/post/PostAuthor";
import PostRelated from "module/post/PostRelated";
const PostDetailsPageStyles = styled.div`
  margin-top: 50px;
  font-family: "Montserrat", sans-serif;
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 67px;
    .post-img {
      width: 100%;
      max-width: 640px;
      height: 470px;
      border-radius: 20px;
    }
    .post-info {
      max-width: 460px;
    }
    .post-category {
      margin-bottom: 25px;
    }
    .post-title {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 36px;
      line-height: 48px;
      color: #23bb86;
    }
  }

  .post-content {
    margin: 50px auto 80px;
    max-width: 800px;
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    background-color: ${(props) => props.theme.grayF3};
    border-radius: 20px;
    &-img {
      flex-shrink: 0;
      width: 240px;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
      }
    }
    &-content {
      padding: 15px;
    }
    &-name {
      margin-bottom: 15px;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
      color: #23bb86;
    }
    &-desc {
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
    }
  }
`;
const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const { user, category } = postInfo;
  const date = new Date(postInfo.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  useEffect(() => {
    async function fetchData() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setPostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  // console.log("postInfo ~", postInfo);
  if (!slug || !postInfo?.title) return;
  return (
    <Layout>
      <PostDetailsPageStyles>
        <div className="container">
          <div className="post-header">
            <PostImage url={postInfo.image}></PostImage>
            <div className="post-info">
              <PostCategory>{postInfo.category?.name}</PostCategory>
              <h1 className="post-title">{postInfo.title}</h1>
              <PostMeta
                to={slugify(user?.fullname)}
                author={user?.fullname}
                date={formatDate}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <PostAuthor userId={user.id}></PostAuthor>
          </div>
          <PostRelated categoryId={category.id}></PostRelated>
        </div>
      </PostDetailsPageStyles>
    </Layout>
  );
};

export default PostDetailsPage;
