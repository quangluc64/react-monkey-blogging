import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import NotFoundPage from "pages/NotFoundPage";
import { useAuth } from "contexts/auth-context";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
      @media screen and (max-width: 1023.98px) {
        display: block;
      }
    }
  }
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;
const DashboardLayout = () => {
  const { userInfo } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles>
      <DashboardHeader setSidebarOpen={setSidebarOpen}></DashboardHeader>
      <div className="dashboard-main">
        {sidebarOpen && (
          <div
            className="overlay"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          ></div>
        )}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
