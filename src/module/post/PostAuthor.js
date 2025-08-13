import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
const PostAuthor = ({ userId }) => {
  // console.log("userId ~", userId);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    }
    fetchData();
  }, [userId]);
  if (!userId || !user) return;
  return (
    <div className="author">
      <div className="author-img">
        <img src={user?.avatar} alt="" loading="lazy" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </div>
  );
};

export default PostAuthor;
