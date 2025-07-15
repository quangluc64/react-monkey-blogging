import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import { ImageUpload } from "components/image";
import useCloudinaryImage from "hooks/useCloudinaryImage";
import { Toggle } from "components/toggle";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      image: "",
      hot: false,
      categoryId: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const { onSelectImage, handleUploadImage, handleDeleteImage, previewImage } =
    useCloudinaryImage();
  const addPostHandler = async (values) => {
    values.slug = slugify(values.slug || values.title);
    // const uploaded = await handleUploadImage();
    // values.image = uploaded.url;
    console.log("Dữ liệu gửi đi:", values);
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    // Hàm lấy dữ liệu từ Firestore
    const getData = async () => {
      const colRef = collection(db, "categories");
      // Tạo tham chiếu đến collection "categories"
      const q = query(colRef, where("status", "==", 1));
      // Tạo truy vấn: chỉ lấy những document có status === 1
      const querySnapshot = await getDocs(q);
      // Thực thi truy vấn và lấy dữ liệu
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        // Duyệt qua từng document trong kết quả và log ra console
        setCategory(result);
        // console.log(result);
      });
    };
    // Gọi hàm khi component được render lần đầu
    getData();
  }, []);

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={onSelectImage}
              image={previewImage}
              onDelete={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {category.length > 0 &&
                  category.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => setValue("categoryId", item.id)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={2}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={3}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
