import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Pagination } from "components/pagination";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { postStatus } from "utils/constants";
const POST_PER_PAGE = 4;
const PostManage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        // console.log("snapshot.size ~", snapshot.size);
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const handleDeletePost = async (postId) => {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        toast.success("Delete user successfully");
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warming">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Manage Posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            placeholder="Search post..."
            onChange={handleInputFilter}
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id.slice(0, 7) + "..."}</td>
                <td className="min-w-[300px]">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="">
                      <h3 className="font-semibold">
                        {post.title?.split(" ").slice(0, 2).join(" ") + "..."}
                      </h3>
                      <time className="text-sm text-gray-500">
                        Date:{" "}
                        {new Date(
                          post?.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user.fullname}</span>
                </td>
                <td>{renderLabelStatus(post.status)}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit onClick={() => navigate(`/manage/update-post?id=${post.id}`)}></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <div className="mt-10">
        <Pagination></Pagination>
      </div> */}
      {total > postList.length && (
        <div className="mt-10">
          <Button
            onClick={handleLoadMorePost}
            className="mx-auto"
            height="60px"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
