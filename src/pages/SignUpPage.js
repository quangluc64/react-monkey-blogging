import React from "react";
import styled from "styled-components";
// Để định nghĩa CSS theo cách viết JavaScript (CSS-in-JS)
const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo{
    margin: 0 auto 20px;
  }
  .heading{
    text-align: center;
    color: ${props => props.theme.primary};
    font-size: 40px;
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`} alt="monkey" className="logo"/>
        <h1 className="heading">Monkey-Blogging</h1>
      </div>
    </SignUpPageStyles>
  );
};
export default SignUpPage;
