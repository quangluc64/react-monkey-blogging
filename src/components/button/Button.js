import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ButtonStyles = styled.button`
  cursor: pointer;
  /* width: 100%; */
  /* max-width: 350px; */
  height: ${(props) => props.height || "70px"};
  display: block;
  margin: 0 auto;
  padding: 0 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 1;
  border-radius: 10px;
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: #fff;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: #fff;
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.2);
    `};
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
/**
 * @param {*} onClick Handle onClick
 * @requires
 * @param {string} type Type of the button "button" | "submit"
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string")
    return (
      <Link to={to}>
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </Link>
    );
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]), // Kiểu button
  height: PropTypes.string, // Chiều cao (ví dụ: "50px")
  to: PropTypes.string, // Đường dẫn nếu dùng NavLink
};
export default Button;
