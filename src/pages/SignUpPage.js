import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-size: 40px;
    margin-bottom: 60px;
  }
  form {
    margin: 0 auto;
    max-width: 800px;
  }
`;
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup.string().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must have at least 8 characters"),
});
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleSignUp = (values) => {
    console.log(values);
    console.log(isSubmitting);
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
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
    <SignUpPageStyles>
      <div className="container">
        <img
          srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`}
          alt="monkey"
          className="logo"
        />
        <h1 className="heading">Monkey-Blogging</h1>
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
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            style={{ maxWidth: "350px" }}
          >
            SignUp
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};
export default SignUpPage;
