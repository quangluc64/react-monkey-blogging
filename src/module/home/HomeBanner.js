import { Button } from "components/button";
import React from "react";
import styled from "styled-components";
const HomeBannerStyles = styled.div`
  padding: 40px 0;
  margin-bottom: 60px;
  min-height: 520px;
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .banner-content {
    max-width: 450px;
  }
  .banner-heading {
    margin-bottom: 30px;
    font-size: 48px;
    font-weight: 700;
    color: #fff;
  }
  .banner-desc {
    margin-bottom: 40px;
    line-height: 2;
    color: #fff;
  }
  .banner-button {
    margin-left: 0;
  }
  .banner-img {
    padding-right: 10%;
    width: 100%;
    height: 440px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .banner-img img {
    max-height: 100%;
    /* transform: translateX(25%); */
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      display: flex;
      align-items: center;
      justify-content: center;
      &-img {
        display: none;
      }
    }
    .banner-content {
      max-width: 90%;
    }
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
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            <Button to="/sign-up" kind="secondary" className="banner-button">
              Get started
            </Button>
          </div>
          <div className="banner-img">
            <img
              src={`${process.env.PUBLIC_URL}/img-banner.png`}
              alt="banner"
            />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
