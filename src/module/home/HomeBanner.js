import { Button } from "components/button";
import React from "react";
import styled from "styled-components";
const HomeBannerStyles = styled.div`
  margin-top: 40px;
  min-height: 520px;
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .banner-content{
    max-width: 450px;
  }
  .banner-heading{
    margin-bottom: 30px;
    font-size: 48px;
    font-weight: 700;
    color: #fff;
  }
  .banner-desc{
    margin-bottom: 40px;
    line-height: 2;
    color: #fff;
  }
  .banner-button{
    margin-left: 0;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button to="/sign-up" kind="secondary" className="banner-button">Get started</Button>
          </div>
          <div className="banner-img">
            <img src={`${process.env.PUBLIC_URL}/img-banner.png`} alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
