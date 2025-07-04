import { LoadingSpinner } from "components/loading";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
/**
 * @param {*} onClick Handle onClick
 * @requires
 * @param {string} type Type of the button "button" | "submit"
 */
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
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
}
export default Button;

