import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Label } from "components/label";
import useCloudinaryImage from "hooks/useCloudinaryImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { userRole, userStatus } from "utils/constants";
const UserAddNew = () => {
  const { control, watch, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 1,
      role: 1,
    },
  });
  const watchStatus = watch("status"); const watchRole = watch("role");
  const { onSelectImage, handleUploadImage, handleDeleteImage, previewImage } =
  useCloudinaryImage();
  const handleCreateUser = (values) => {
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
        <ImageUpload
          className="mb-10 mx-auto w-[300px] h-[300px] !rounded-full"
          onChange={onSelectImage}
          image={previewImage}
          onDelete={handleDeleteImage}
        ></ImageUpload>
      <form onSubmit={handleSubmit(handleCreateUser)}>
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
        <Button type="submit">Add new user</Button>
      </form>
    </div>
  );
};

export default UserAddNew;
