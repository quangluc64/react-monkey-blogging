import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
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
import Swal from "sweetalert2";
import { categoryStatus, userRole } from "utils/constants";

const CATEGORY_PER_PAGE = 10;

const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
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
        setCategoryList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleDeleteCategory = async (docId) => {
    // console.log("docId ~", docId);
    const colRef = doc(db, "categories", docId);
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
        await deleteDoc(colRef); // Delete Category
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  const {userInfo} = useAuth();
  if(userInfo.role !== userRole.ADMIN) return;
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Slug</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <span className="italic text-gray-400">{category.slug}</span>
              </td>
              <td>
                {category.status === categoryStatus.APPROVED && (
                  <LabelStatus type="success">Approved</LabelStatus>
                )}
                {category.status === categoryStatus.UNAPPROVED && (
                  <LabelStatus type="warning">Unapproved</LabelStatus>
                )}
              </td>
              <td>
                <div className="flex items-center gap-x-3">
                  <ActionView></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-category?id=${category.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDeleteCategory(category.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className="mt-10">
          <Button
            onClick={handleLoadMoreCategory}
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

export default CategoryManage;
