import React, { useEffect } from "react";
// import styled from "styled-components";
// Để định nghĩa CSS theo cách viết JavaScript (CSS-in-JS)
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import slugify from "react-slugify";
import { userRole, userStatus } from "utils/constants";
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup.string().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must have at least 8 characters"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname, // default fullname = null
      photoURL:
        "https://res.cloudinary.com/dqpdddmjn/image/upload/v1753276599/monkey-blogging/opxvygufoogxvqtmqjpu.jpg",
    });
    // const userRef = collection(db, "users");
    // await addDoc(userRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
      avatar:
        "https://res.cloudinary.com/dqpdddmjn/image/upload/v1754297378/monkey-blogging/y1g56yi4pcqa8ngtrl7z.jpg",
    });
    toast.success("Register successfully!");
    navigate("/");
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0].message, {
        pauseOnHover: false,
      });
  }, [errors]);
  return (
    <Authentication>
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Please enter your fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Please enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account ? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{
            width: "100%",
            maxWidth: "350px",
          }}
        >
          SignUp
        </Button>
      </form>
    </Authentication>
  );
};
export default SignUpPage;
