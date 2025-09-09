import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import PostItem from "module/post/PostItem";
import styled from "styled-components";
const AuthorPageStyles = styled.div`
  @media screen and (max-width: 767.98px) {
    .author-list {
      grid-auto-flow: row;
      grid-auto-columns: auto;
    }
  }
`;
const AuthorPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const colRef = collection(db, "posts");
        const q = query(
          colRef,
          where("user.username", "==", slug),
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
    <AuthorPageStyles>
      <Layout>
        <div className="container pb-10">
          <h2
            className="mb-5 text-2xl font-semibold text-secondary"
            style={{ color: "#23bb86", fontFamily: "Poppins, sans-serif" }}
          >
            {postList.length > 0
              ? `Author: ${postList[0]?.user?.fullname}`
              : `Author: ${slug}`}
          </h2>

          {postList.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No posts found for this author.</p>
            </div>
          ) : (
            <div className="grid-layout grid-layout--primary author-list">
              {postList.map((post) => (
                <PostItem key={post.id} data={post} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </AuthorPageStyles>
  );
};

export default AuthorPage;
