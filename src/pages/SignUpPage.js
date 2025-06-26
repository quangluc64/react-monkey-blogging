import React from "react";
import styled from "styled-components";
// Để định nghĩa CSS theo cách viết JavaScript (CSS-in-JS)
import { Label } from "components/label";
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
    margin-bottom: 60px;
  }
  form{
    margin: 0 auto;
    max-width: 800px;
  }
  .field{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px
  }
  .input{
    padding: 25px;
    width: 100%;
    border-radius: 10px;
    background-color: ${props => props.theme.grayLight};
    border: 2px solid transparent;
    font-weight: 500;
  }
  .input::placeholder{
    color: "#84878B";
    ;
  }
  .input:focus{
    border-color: ${props => props.theme.primary};;
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`} alt="monkey" className="logo"/>
        <h1 className="heading">Monkey-Blogging</h1>
        <form className="form">
          <div className="field">
            <Label htmlFor="fullname">Fullname</Label>
            <input id="fullname" type="text" className="input" placeholder="Please enter your fullname"/>
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};
export default SignUpPage;
