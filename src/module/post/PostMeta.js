import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #b1b5c3;
  .post {
    &-dot {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background-color: currentColor;
    }
  }
`;
const PostMeta = ({
  date = "March 23",
  author = "Andiez Le",
  className = "",
  to = "",
}) => {
  return (
    <PostMetaStyles className={`post-info ${className}`}>
      <span className="post-date">{date}</span>
      <span className="post-dot"></span>
      <Link to={`/author/${to}`}>
        <span className="post-author">{author}</span>
      </Link>
    </PostMetaStyles>
  );
};

export default PostMeta;
