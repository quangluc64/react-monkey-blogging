import React, { useEffect } from "react";
import Authentication from "./Authentication";
import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import { Field } from "components/field";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import InputPasswordToggle from "components/input/InputPasswordToggle";
const schema = yup.object({
  email: yup.string().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must have at least 8 characters"),
});
const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (userInfo?.email) {
      // navigate("/");
    }
  }, [userInfo]);
  console.log(userInfo);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0].message, {
        pauseOnHover: false,
      });
  }, [errors]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success("Login successfully!");
    navigate("/");
  };
  return (
    <Authentication>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
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
          You have not had an account ?{" "}
          <NavLink to={"/sign-up"}>Register an account</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{ width: "100%", maxWidth: "350px" }}
        >
          Login
        </Button>
      </form>
    </Authentication>
  );
};

export default SignInPage;
