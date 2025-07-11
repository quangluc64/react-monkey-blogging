import { Button } from "components/button";
import React from "react";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
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
`;

const DashboardHeader = () => {
  return (
    <DashboardHeaderStyles>
      <Button to="/dashboard" className="header-button" height="52px">
        Write new post
      </Button>
      <div className="header-avatar">
        <img
          src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/506207603_4204780193177987_3533443891558108355_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEQz_gYwK6D2tIAq4chHLmgo3JxgG3OX1KjcnGAbc5fUjU8NlUhsNRui1lJNudbziTa-G1M4kfFWA4dSjmDGDJC&_nc_ohc=1FmTqIXR1HEQ7kNvwE81yzU&_nc_oc=AdlnS3PUw62cz9l9la8TmUIzKfbcuB6jCRgSSmmXCsSZg86wk6r9UbMUJOf9jFMwLqAbxaIkc6Hml7H7-NgbS29c&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=dCj1Q2uA_zGem-HtD1qpFg&oh=00_AfSA1xealWb5zwLGDJCdSB1J0UIg2ZTs4vQFpnn47I8CgQ&oe=68743A7E"
          alt=""
        />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
