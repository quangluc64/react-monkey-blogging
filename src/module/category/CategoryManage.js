import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus } from "utils/constants";

const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "categories");
    // Hàm lắng nghe thời gian thực Firestore
    // Khi có thay đổi trong collection categories
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      // Snapshot là dữ liệu mới nhất của collection sau khi thay đổi
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });
  }, []);
  // console.log("categoryList ~", categoryList);
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
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
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
                  <ActionEdit onClick={() => navigate(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDeleteCategory(category.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
