import React from "react";
import CardSection from "@/Components/Common/CardSection";
import CategorySection from "@/Components/Common/CategorySection";

const HomePage = () => {
  return (
    <>
      <CardSection
        title="Our Best City Exploration Plans"
        category="680819f66e7cdbc049ab3f57"
      />
      <CardSection title="Local Favorites Near San Francisco" search="tour" />
      <CategorySection title="Browse by Category" />
    </>
  );
};

export default HomePage;
