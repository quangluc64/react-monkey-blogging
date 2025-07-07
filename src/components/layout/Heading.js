import React from "react";
import styled from "styled-components";
const HeadingStyles = styled.h2`
  margin-bottom: 30px;
  position: relative;
  color: ${(props) => props.theme.tertiary};
  font-weight: 700;
  font-size: 28px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, -150%);
    width: 50px;
    height: 4px;
    background-color: #00d1ed;
  }
`;
const Heading = ({ children, ...props }) => {
  return <HeadingStyles {...props}>{children}</HeadingStyles>;
};

export default Heading;
