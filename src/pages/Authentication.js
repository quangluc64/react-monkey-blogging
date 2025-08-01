import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const AuthenticationStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  form {
    margin: 0 auto;
    max-width: 800px;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
const Authentication = ({ children }) => {
  return (
    <AuthenticationStyles>
      <div className="container">
        <NavLink to="/">
          <img
            srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`}
            alt="monkey"
            className="logo"
          />
        </NavLink>
        <h1 className="heading">Monkey-Blogging</h1>
        {children}
      </div>
    </AuthenticationStyles>
  );
};

export default Authentication;
