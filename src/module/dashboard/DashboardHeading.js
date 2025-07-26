import React from "react";
import styled from "styled-components";
const DashboardHeaderStyled = styled.div`
  margin-bottom: 40px;
  .dashboard-heading {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.black};
  }
  .dashboard-short-desc {
    font-size: 14px;
    color: ${(props) => props.theme.gray80};
  }
`;
const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <DashboardHeaderStyled>
      <h1 className="dashboard-heading">{title}</h1>
      <p className="dashboard-short-desc">{desc}</p>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeading;
