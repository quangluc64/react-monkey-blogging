import Heading from "components/layout/Heading";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

const PostRelated = ({ categoryId }) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("category.id", "==", categoryId), orderBy("createdAt", "desc"),);
    onSnapshot(queries, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList(results);
    });
  }, [categoryId]);
  return (
    <div className="post-related pb-10">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {postList.map((post) => (
          <PostItem key={post.id} data={post}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
