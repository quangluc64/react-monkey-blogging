import Layout from "components/layout/Layout";
import PostImage from "module/post/PostImage";
import React, { useEffect, useState } from "react";
import PostCategory from "module/post/PostCategory";
import PostMeta from "module/post/PostMeta";
import postDetailMain from "assets/images/post-detail-main.jfif";
import postDetailSub from "assets/images/post-detail-sub.jfif";
import postDetailAuthor from "assets/images/post-detail-author.jpeg";
import styled from "styled-components";
import Heading from "components/layout/Heading";
import PostItem from "module/post/PostItem";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import parse from "html-react-parser";
import slugify from "react-slugify";
const PostDetailsPageStyles = styled.div`
  margin-top: 50px;
  font-family: "Montserrat", sans-serif;
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 67px;
    .post-img {
      width: 100%;
      max-width: 640px;
      height: 470px;
      border-radius: 20px;
    }
    .post-info {
      max-width: 460px;
    }
    .post-category {
      margin-bottom: 25px;
    }
    .post-title {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 36px;
      line-height: 48px;
      color: #23bb86;
    }
  }

  .post-content {
    margin: 50px auto 80px;
    max-width: 800px;
  }
  /* .entry-content {
    margin-bottom: 70px;
    h2 {
      margin-bottom: 25px;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
    }
    p {
      margin-bottom: 40px;
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      font-family: Montserrat;
      letter-spacing: 0.5px;
      &:last-child{
        margin-bottom: 0px;
      }
    }
    figure {
      margin-bottom: 40px;
      img {
        border-radius: 20px;
        margin-bottom: 20px;
      }
      figcaption {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: ${(props) => props.theme.gray6B};
      }
    }
  } */
  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
  .author-img {
    flex-shrink: 0;
    width: 240px;
    height: 240px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  .author-content {
    padding: 15px;
  }
  .author-name {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
    color: #23bb86;
  }
  .author-desc {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
  }
`;
const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const {user} = postInfo;
  const date = new Date(postInfo.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  useEffect(() => {
    async function fetchData() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setPostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, []);
  console.log("postInfo ~", postInfo);
  if (!slug || !postInfo?.title) return <NotFoundPage></NotFoundPage>;
  return (
    <Layout>
      <PostDetailsPageStyles>
        <div className="container">
          <div className="post-header">
            <PostImage url={postInfo.image}></PostImage>
            <div className="post-info">
              <PostCategory>{postInfo.category?.name}</PostCategory>
              <h1 className="post-title">{postInfo.title}</h1>
              <PostMeta
                to={slugify(user?.fullname)}
                author={user?.fullname}
                date={formatDate}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            {/* <div className="entry-content">
              <h2>Chương 1</h2>
              <p>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices
                rosette bone-in simmer precision alongside baby leeks. Crafting
                renders aromatic enjoyment, then slices taco. Minutes
                undisturbed cuisine lunch magnificent mustard curry. Juicy share
                baking sheet pork. Meals ramen rarities selection, raw pastries
                richness magnificent atmosphere. Sweet soften dinners, cover
                mustard infused skillet, Skewers on culinary experience.
              </p>
              <p>
                Juicy meatballs brisket slammin' baked shoulder. Juicy smoker
                soy sauce burgers brisket. polenta mustard hunk greens. Wine
                technique snack skewers chuck excess. Oil heat slowly. slices
                natural delicious, set aside magic tbsp skillet, bay leaves
                brown centerpiece. fruit soften edges frond slices onion snack
                pork steem on wines excess technique cup; Cover smoker soy sauce
                fruit snack. Sweet one-dozen scrape delicious, non sheet raw
                crunch mustard. Minutes clever slotted tongs scrape, brown steem
                undisturbed rice.
              </p>
              <p>
                Food qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers.
              </p>
              <figure>
                <img src={postDetailSub} alt="" loading="lazy" />
                <figcaption>
                  Gastronomy atmosphere set aside. Slice butternut cooking home.
                </figcaption>
              </figure>
              <h2>Chương 2</h2>
              <p>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices
                rosette bone-in simmer precision alongside baby leeks. Crafting
                renders aromatic enjoyment, then slices taco. Minutes
                undisturbed cuisine lunch magnificent mustard curry. Juicy share
                baking sheet pork. Meals ramen rarities selection, raw pastries
                richness magnificent atmosphere. Sweet soften dinners, cover
                mustard infused skillet, Skewers on culinary experience.
              </p>
            </div> */}
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <div className="author">
              <div className="author-img">
                <img src={user.avatar} alt="" loading="lazy" />
              </div>
              <div className="author-content">
                <h3 className="author-name">{user.fullname}</h3>
                <p className="author-desc">
                  Gastronomy atmosphere set aside. Slice butternut cooking home.
                  Delicious romantic undisturbed raw platter will meld. Thick
                  Skewers skillet natural, smoker soy sauce wait roux.
                  Gastronomy atmosphere set aside. Slice butternut cooking home.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
              <PostItem></PostItem>
              <PostItem></PostItem>
              <PostItem></PostItem>
              <PostItem></PostItem>
            </div>
          </div>
        </div>
      </PostDetailsPageStyles>
    </Layout>
  );
};

export default PostDetailsPage;
