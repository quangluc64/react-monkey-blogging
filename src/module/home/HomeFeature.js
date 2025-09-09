import Heading from "components/layout/Heading";
import { useAuth } from "contexts/auth-context";
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
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!userInfo?.email) return;
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("hot", "==", true),
      where("status", "==", 1),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [userInfo]);
  if (!userInfo?.email) return;
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
