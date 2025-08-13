import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const TextareaStyles = styled.div`
  width: 50%;
  textarea {
    padding: 30px;
    width: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.grayLight};
    border: 2px solid transparent;
    font-weight: 500;
    transition: all 0.2s linear;
    resize: none;
    min-height: 200px;
  }
  textarea::placeholder {
    color: #84878b;
  }
  textarea:focus {
    border-color: ${(props) => props.theme.primary};
  }
`;
/**
 *
 * @param {*} placeholder(optional) - Placeholder of Textarea
 * @param {*} name(optional) - name of Textarea
 * @param {*} control - control from react hook form
 * @returns Textarea
 */
const Textarea = ({
  name = "",
  type = "text",
  control,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <TextareaStyles>
      <textarea id={name} type={type} {...field} {...props}></textarea>
    </TextareaStyles>
  );
};
export default Textarea;
