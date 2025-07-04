import React from "react";
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
    margin-bottom: 60px;
  }
  form {
    margin: 0 auto;
    max-width: 800px;
  }
`;
const Authentication = ({ children }) => {
  return (
    <AuthenticationStyles>
      <div className="container">
        <img
          srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`}
          alt="monkey"
          className="logo"
        />
        <h1 className="heading">Monkey-Blogging</h1>
        {children}
      </div>
    </AuthenticationStyles>
  );
};

export default Authentication;
