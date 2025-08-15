import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostItem from "module/post/PostItem";
import PostNewestItem from "module/post/PostNewestItem";
import PostNewestLarge from "module/post/PostNewestLarge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
    margin-bottom: 64px;
  }
  .sidebar {
    padding: 30px 20px;
    background-color: #f3edff;
    border-radius: 12px;
  }
`;
const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  const [similarPosts, setSimilarPosts] = useState([]);
  // Fetch Newest Posts
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("hot", "==", false),
      where("status", "==", 1),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  const [first, ...others] = posts;
  // Fetch Similar Posts
  useEffect(() => {
    if (!first?.category?.id) return;
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("category.id", "==", first.category.id),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const unsubscribe = onSnapshot(queries, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // Loại bỏ bài viết đang là "first"
      results = results.filter((item) => item.id !== first.id);
      setSimilarPosts(results);
    });
    // Cleanup function !!!
    return () => {
      console.log("Cleaning up listener");
      unsubscribe();
    };
  }, [first?.category?.id]);
  // console.log("similarPosts ~", similarPosts);
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Newest update</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {others.map((post) => (
              <PostNewestItem key={post.id} data={post}></PostNewestItem>
            ))}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          {similarPosts.map((post) => (
            <PostItem key={post.id} data={post}></PostItem>
          ))}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
