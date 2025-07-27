import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
const NotFoundPageStyles = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.theme.black};
  color: white;
  .heading {
    font-size: 60px;
    font-weight: bold;
  }
  .description{
    max-width: 800px;
    text-align: center;
    line-height: 1.7;
  }
  .back {
    padding: 15px 30px;
    background-color: ${(props) => props.theme.primary};
    color: #fff;
    border-radius: 10px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageStyles>
      <NavLink to="/">
        <img
          srcSet={`${process.env.PUBLIC_URL}/404.png 2x`}
          alt="monkey-blogging"
          className="logo"
        />
      </NavLink>
      <h1 className="heading">404 - Looks like you're lost.</h1>
      <p className="description">
        Maybe this page used to exist or you just spelled something wrong.
        Chances are your spelled something wrong, so can you double check the
        URL?
      </p>
      <button onClick={() => navigate(-1)}  className="back">Go back</button>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
