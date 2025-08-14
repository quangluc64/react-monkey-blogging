import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import PostItem from "module/post/PostItem";

const AuthorPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    if (!slug) return;
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("user.username", "==", slug),
      orderBy("createdAt", "desc")
    );
    // Tạo listener và lưu unsubscribe function
    const unsubscribe = onSnapshot(queries, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList(results);
    });
    // Cleanup function - rất quan trọng!
    return () => {
      console.log("Cleaning up listener for slug:", slug);
      unsubscribe();
    };
  }, [slug]);
  if (!slug) return <NotFoundPage />;
  return (
    <Layout>
      <div className="container">
        <h2
          className="mb-5 text-2xl font-semibold text-secondary"
          style={{ color: "#23bb86" }}
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
          <div className="grid-layout grid-layout--primary">
            {postList.map((post) => (
              <PostItem key={post.id} data={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthorPage;
