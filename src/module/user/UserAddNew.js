import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Label } from "components/label";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useCloudinaryImage from "hooks/useCloudinaryImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
const UserAddNew = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const { onSelectImage, handleUploadImage, handleDeleteImage, previewImage } =
    useCloudinaryImage();
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      const uploaded = await handleUploadImage();
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        avatar: uploaded.url,
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        email: values.email,
        password: values.password,
        status: Number(watchStatus),
        role: Number(watchRole),
        createdAt: serverTimestamp(),
      });
      toast.success("Create new user successfully");
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleDeleteImage();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <ImageUpload
        className="mb-10 mx-auto !w-[250px] h-[250px] !rounded-full"
        onChange={onSelectImage}
        image={previewImage}
        onDelete={handleDeleteImage}
      ></ImageUpload>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-10 sm:mb-0">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-10 sm:mb-0">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-10 sm:mb-0">
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
