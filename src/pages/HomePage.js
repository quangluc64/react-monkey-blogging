import Layout from "components/layout/Layout";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";
import React from "react";
const HomePage = () => { 
  return (
    <Layout>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </Layout>
  );
};
export default HomePage;
