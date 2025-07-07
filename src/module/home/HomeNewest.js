import Heading from "components/layout/Heading";
import PostNewestItem from "module/post/PostNewestItem";
import PostNewestLarge from "module/post/PostNewestLarge";
import React from "react";
import styled from "styled-components";
const HomeNewestStyles = styled.div`
  margin-top: 60px;
  font-family: "Montserrat", sans-serif;
  .grid{
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 60px;
  }
  .sidebar{
    padding: 30px 20px;
    background-color: #F3EDFF;
    border-radius: 12px;
  }
`;
const HomeNewest = () => {
  return (
    <HomeNewestStyles>
      <div className="container">
        <Heading>Newest update</Heading>
        <div className="grid">
          <PostNewestLarge></PostNewestLarge>
          <div className="sidebar">
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
