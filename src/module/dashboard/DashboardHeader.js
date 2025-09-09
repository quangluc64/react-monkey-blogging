import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .mobile-menu-icon {
    display: none;
  }
  @media screen and (max-width: 1023.98px) {
    .mobile-menu-icon {
      display: block;
    }
  }
`;

const DashboardHeader = ({ setSidebarOpen }) => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyles>
      <span
        className="mobile-menu-icon mr-auto"
        onClick={() => setSidebarOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          ></path>
        </svg>
      </span>
      <Button to="/manage/add-post" className="header-button" height="52px">
        Write new post
      </Button>
      <div className="header-avatar">
        <img src={userInfo?.avatar} alt="" />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
