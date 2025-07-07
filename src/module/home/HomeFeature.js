import Heading from "components/layout/Heading";
import PostFeatureItem from "module/post/PostFeatureItem";
import React from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div`
  font-family: "Montserrat", sans-serif;
  margin-top: 60px;
  .grid-layout{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
  }
`;
const HomeFeature = () => {
  return (
    <HomeFeatureStyles>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
