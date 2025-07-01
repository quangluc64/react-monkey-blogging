import { LoadingSpinner } from "components/loading";
import React from "react";
import styled from "styled-components";
const ButtonStyles = styled.button`
  cursor: pointer;
  width: 100%;
  /* max-width: 350px; */
  height: ${props => props.height || "70px"} ;
  display: block;
  margin: 0 auto;
  padding: 0 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 1;
  color: #fff;
  border-radius: 10px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const {isLoading }= props;
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
export default Button;

