
import { IconEyeOpen } from "components/icon";
import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    padding: ${(props) => (props.hasIcon ? "25px 60px 25px 25px" : "25px")};
    // Truy cập props (thuộc tính) trong styled component
    width: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.grayLight};
    border: 2px solid transparent;
    font-weight: 500;
    transition: all 0.2s linear;
  }
  input::placeholder {
    color: "#84878B";
  }
  input:focus {
    border-color: ${(props) => props.theme.primary};
  }
  .input-icon{
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const Input = ({
  name = "",
  type = "text",
  children,
  hasIcon = false,
  control,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children}
    </InputStyles>
  );
};
export default Input;

