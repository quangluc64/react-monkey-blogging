import React, { Fragment, useState } from "react";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "components/icon";
const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default InputPasswordToggle;
