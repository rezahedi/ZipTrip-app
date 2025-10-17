import React from "react";
import CardSection from "@/Components/Common/CardSection";
import CitiesSection from "@/Components/Common/CitiesSection";
import ExploreBlock from "./ExploreBlock";
import SignupBlock from "./SignupBlock";

const HomePage = () => {
  return (
    <>
      <CardSection
        title="Local Favorites Near San Francisco, California"
        cityId="ChIJIQBpAG2ahYAR_6128GcTUEo"
      />
      <CardSection title="Most Liked City Exploration Plans" search="r" />
      <ExploreBlock />
      <CitiesSection title="Browse by Cities" />
      <SignupBlock />
    </>
  );
};

export default HomePage;
