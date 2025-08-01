import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const HeaderStyles = styled.div`
  padding: 40px 0;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 100%;
    max-width: 50px;
  }
  .menu {
    margin-left: 40px;
    transform: translateY(5px);
    display: flex;
    gap: 40px;
    list-style: none;
  }
  .menu-link {
    font-weight: 500;
    font-size: 18px;
  }
  .header-right {
    flex: 1;
    margin-left: auto;
  }
  .search {
    display: flex;
    position: relative;
    margin-right: 20px;
    margin-left: auto;
    width: 100%;
    max-width: 320px;
  }
  .search-input {
    flex: 1;
    padding: 15px 45px 15px 15px;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  .search-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .header-button {
    margin-right: 0;
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  // console.log("userInfo", userInfo);
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img
              srcSet={`${process.env.PUBLIC_URL}/logo.png 2x`}
              alt="monkey-blogging"
              className="logo"
            />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item, index) => (
              <li className="menu-item" key={index}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              to="/sign-in"
              type="button"
              className="header-button"
              height="56px"
              style={{
                maxWidth: "200px",
              }}
            >
              SignUp
            </Button>
          ) : (
            // <div className="header-auth">
            //   <span>Welcome back, </span>
            //   <strong className="text-primary">{userInfo.displayName || "User"}</strong>
            // </div>
            <div className="header-auth">
              <Button
                to="/dashboard"
                type="button"
                className="header-button"
                height="56px"
                style={{
                  maxWidth: "200px",
                }}
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};
export default Header;
