import React from "react";
import styled, { css } from "styled-components";
const PostCategoryStyles = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.theme.gray6B};
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: #fff;
    `};
`;
const PostCategory = ({ children, type = "primary", className = "" }) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      {children}
    </PostCategoryStyles>
  );
};
export default PostCategory;

