import React from "react";
import Authentication from "./Authentication";
import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import { Field } from "components/field";
import { useForm } from "react-hook-form";
const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const handleSignIn = () => {

  }
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
          <Input
            type="password"
            name="password"
            placeholder="Please enter your password"
            control={control}
          ></Input>
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
    </Authentication>
  );
};

export default SignInPage;
