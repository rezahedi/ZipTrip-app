import React from "react";
import CardSection from "@/Components/Common/CardSection";
import CategorySection from "@/Components/Common/CategorySection";
import ExploreBlock from "./ExploreBlock";
import SignupBlock from "./SignupBlock";

const HomePage = () => {
  return (
    <>
      <CardSection
        title="Local Favorites Near San Jose, California"
        cityId="ChIJ9T_5iuTKj4ARe3GfygqMnbk"
      />
      <CardSection title="Our Best City Exploration Plans" search="r" />
      <ExploreBlock />
      <CategorySection title="Browse by Category" />
      <SignupBlock />
    </>
  );
};

export default HomePage;
