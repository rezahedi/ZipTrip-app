import React from "react";
import CardSection from "@/Components/Common/CardSection";
import CitiesSection from "@/Components/Common/CitiesSection";
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
      <CitiesSection title="Browse by Cities" />
      <SignupBlock />
    </>
  );
};

export default HomePage;
