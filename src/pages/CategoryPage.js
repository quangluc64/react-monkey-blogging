import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import PostItem from "module/post/PostItem";

const CategoryPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  // const [categoryName, setCategoryName] = useState("");
  // useEffect(() => {
  //   async function fetchCategory() {
  //     const colRef = collection(db, "categories");
  //     const q = query(
  //       colRef,
  //       where("slug", "==", slug),
  //       orderBy("createdAt", "desc")
  //     );
  //     // Query (kết quả tìm nhiều document)
  //     const querySnapshot = await getDocs(q);
  //     setCategoryName(querySnapshot.docs[0].data().name);
  //   }
  //   fetchCategory();
  // }, [slug]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("category.slug", "==", slug),
      orderBy("createdAt", "desc")
    );
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
      console.log("Cleaning up listener");
      unsubscribe();
    };
  }, [slug]);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  return (
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
        <div className="grid-layout grid-layout--primary">
          {postList.map((post) => (
            <PostItem key={post.id} data={post}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
