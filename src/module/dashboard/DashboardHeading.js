import React from "react";
import styled from "styled-components";
const DashboardHeaderStyled = styled.div`
  margin-bottom: 40px;
  .dashboard-heading {
    margin-bottom: 5px;
    /* font-weight: bold;
    font-size: 25px; */
    /* color: ${(props) => props.theme.black}; */
  }
  .dashboard-short-desc {
    font-size: 14px;
    color: ${(props) => props.theme.gray80};
  }
`;
const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <DashboardHeaderStyled>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="dashboard-heading">{title}</h1>
          <p className="dashboard-short-desc">{desc}</p>
        </div>
        {children}
      </div>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeading;
