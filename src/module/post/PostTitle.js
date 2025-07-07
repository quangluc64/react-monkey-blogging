import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, {css} from 'styled-components';
const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  ${props => props.size === "normal" && css`
    font-size: 18px;
  `};
  ${props => props.size === "large" && css`
    font-size: 22px;
  `};
  a{
    display: block;
  }
`
const PostTitle = ({children, className="", size, to="/"}) => {
  return (
    <PostTitleStyles className={`post-title ${className}`} size={size}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;