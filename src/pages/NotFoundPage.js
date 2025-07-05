import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NotFoundPageStyles = styled.div`
  display: flex;
  gap: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  .back{
    padding: 15px 30px;
    background-color: ${props => props.theme.primary};
    color: #fff;
    border-radius: 10px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/">
        <img
          srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`}
          alt="monkey-blogging"
          className="logo"
        />
      </NavLink>
      <h1 className="heading">Opps! Page not found</h1>
      <NavLink to="/" className="back">Back to home</NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
