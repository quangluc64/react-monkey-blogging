import React from "react";
import styled from "styled-components";
import featureItemImg from "assets/images/feature-item-img.jpg";
const PostFeatureItemStyles = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  color: #fff;
  overflow: hidden;
  .post-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transform: scale(2);
  }
  .post-content {
    position: absolute;
    inset: 0;
    padding: 20px;
  }
  .post-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-category {
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #f3edff;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #6b6b6b;
  }
  .post-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }
  .post-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background-color: currentColor;
  }
  .post-title {
    margin-top: 20px;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
  }
`;
const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <img
        src={featureItemImg}
        alt="unsplash"
        className="post-img"
      />
      <div className="post-content">
        <div className="post-top">
          <span className="post-category">Kiến thức</span>
          <div className="post-info">
            <span className="post-date">Mar 23</span>
            <span className="post-dot"></span>
            <span className="post-author">Andiez Le</span>
          </div>
        </div>
        <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
