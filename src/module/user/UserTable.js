import { ActionDelete, ActionEdit } from "components/action";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "users");
      let results = [];
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
    };
    fetchData();
  }, []);
  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.title}>{user.id.slice(0, 5) + "..."}</td>
        <td>
          <div className="flex items-center gap-x-2">
            <img
              src="https://res.cloudinary.com/dqpdddmjn/image/upload/v1753276599/monkey-blogging/opxvygufoogxvqtmqjpu.jpg"
              alt=""
              className="w-10 h-10 object-cover rounded-lg"
            />
            <div>
              <h3>{user.fullname}</h3>
              <time className="text-sm text-gray-400">
                {new Date().toLocaleDateString()}
              </time>
            </div>
          </div>
        </td>
        <td></td>
        <td>{user.email}</td>
        <td></td>
        <td></td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Info</td>
          <td>Username</td>
          <td>Email address</td>
          <td>Status</td>
          <td>Role</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>{userList.map((user) => renderUserItem(user))}</tbody>
    </Table>
  );
};

export default UserTable;
