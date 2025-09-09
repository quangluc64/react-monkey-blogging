import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import PostItem from "module/post/PostItem";
import styled from "styled-components";

const CategoryPageStyles = styled.div`
  @media screen and (max-width: 767.98px) {
    .category-list {
      grid-auto-flow: row;
      grid-auto-columns: auto;
    }
  }`;
const CategoryPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const colRef = collection(db, "posts");
        const q = query(
          colRef,
          where("category.slug", "==", slug),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [slug]);

  if (!slug) return <NotFoundPage />;

  return (
    <CategoryPageStyles>
      <Layout>
        <div className="container pb-10">
          <h2
            className="mb-5 text-2xl font-semibold text-secondary"
            style={{ color: "#23bb86" }}
          >
            {postList.length > 0
              ? `Category: ${postList[0]?.category?.name}`
              : `Category: ${slug}`}
          </h2>
          <div className="grid-layout grid-layout--primary category-list">
            {postList.map((post) => (
              <PostItem key={post.id} data={post} />
            ))}
          </div>
        </div>
      </Layout>
    </CategoryPageStyles>
  );
};

export default CategoryPage;
