import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// Để định nghĩa CSS theo cách viết JavaScript (CSS-in-JS)
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Field } from "components/field";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
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
    });
    const userRef = collection(db, "users");
    await addDoc(userRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully!");
    navigate("/");
  };
  const [togglePassword, setTogglePassword] = useState(false);
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
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Please enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                className="input-icon"
                onClick={() => setTogglePassword(true)}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                className="input-icon"
                onClick={() => setTogglePassword(false)}
              ></IconEyeOpen>
            )}
          </Input>
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
            maxWidth: "350px" }}
        >
          SignUp
        </Button>
      </form>
    </Authentication>
  );
};
export default SignUpPage;
