import React, { useEffect, useState } from "react";
import styled from "styled-components";
import homeFeatureItemImg from "assets/images/home-feature-item.jpg";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
const PostFeatureItemStyles = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  color: #fff;
  overflow: hidden;
  .post-img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    /* transform: scale(2); */
  }
  .post-overlay {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.75);
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .post-content {
    position: absolute;
    inset: 0;
    padding: 20px;
  }
  .post-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-title {
    margin-top: 20px;
  }
  .post-info {
    color: inherit;
  }
`;
const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = useState();
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "categories", data.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }
    fetch();
  }, [data.categoryId]);
  if (!data || !data.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && <PostCategory>{category.name}</PostCategory>}
          <PostMeta></PostMeta>
        </div>
        <PostTitle size="large">{data.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
