import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useCloudinaryImage from "hooks/useCloudinaryImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userRole, userStatus } from "utils/constants";

const UserUpdate = () => {
  const {
    control,
    watch,
    reset,
    getValues,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      status: userStatus.ACTIVE,
      role: userRole.USER,
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [params] = useSearchParams();
  const userId = params.get("id");
  const imageUrl = getValues("avatar");
  const { onSelectImage, handleUploadImage, handleDeleteImage, previewImage } =
    useCloudinaryImage();
  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
      });
      toast.success("Update user information successfully");
    } catch (error) {
      toast.error("Update user failed");
    }
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData.data());
    }
    fetchData();
  }, [userId]);
  if (!userId) return;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user information"
      ></DashboardHeading>
      <ImageUpload
        className="mb-10 mx-auto !w-[250px] h-[250px] !rounded-full"
        onChange={onSelectImage}
        image={imageUrl}
        onDelete={handleDeleteImage}
        deleteButtonPosition="center" 
      ></ImageUpload>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="grid grid-cols-2 gap-x-10">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              control={control}
              placeholder="Please enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              control={control}
              placeholder="Please enter your username"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              control={control}
              placeholder="Please enter your email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              control={control}
              placeholder="Please enter your password"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={1}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={2}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.REJECT}
                value={3}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Role</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={1}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={2}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={3}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          className="mx-auto w-[185px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
