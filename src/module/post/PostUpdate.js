import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Label } from "components/label";
import { Toggle } from "components/toggle";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import useCloudinaryImage from "hooks/useCloudinaryImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { postStatus } from "utils/constants";

const PostUpdate = () => {
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      hot: true,
      status: 2,
    },
  });
  const { onSelectImage, handleUploadImage, handleDeleteImage, previewImage } =
    useCloudinaryImage();
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const [params] = useSearchParams();
  const postId = params.get("id");
  // Lấy danh sách (category) từ Firebase
  useEffect(() => {
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
        // console.log(result);
      });
      setCategories(result);
    };
    // Gọi hàm khi component được render lần đầu
    getData();
  }, []);
  const handleClickOption = async (item) => {
    // setValue("categoryId", item.id);
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const docData = await getDoc(colRef);
      const postData = docData.data();
      if (!postData) return;
      reset(postData);
      setSelectCategory(postData.category); // Reset category
    }
    fetchData();
  }, [postId, reset]);
  const updatePostHandler = (values) => {
    console.log("values ~", values);
  };
  return (
    <div>
      <DashboardHeading
        title="Update Post"
        desc="Update post content"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updatePostHandler)}>
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
              image={previewImage || getValues("image")}
              onDelete={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={selectCategory?.name || "Select the category"}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
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
        <Button
          type="submit"
          className="mx-auto w-[185px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
