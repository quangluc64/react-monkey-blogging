import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const results = [];
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("hot", "==", true),
      where("status", "==", 1),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
