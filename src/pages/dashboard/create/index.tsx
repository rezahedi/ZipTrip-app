import React from "react";
import Sidebar from "./Sidebar";
import { PlacesProvider } from "@/context/PlacesContext";
import MapBox from "./MapBox";
import { ItineraryProvider, useItinerary } from "@/context/ItineraryContext";
import StartPrompt from "./StartPrompt";
import { useParams } from "react-router-dom";
import SidebarSkeleton from "./SidebarSkeleton";
import Title from "@/Components/Header/Title";

const CreatePage = () => {
  return (
    <div className="h-[calc(100vh-61px)] flex flex-col-reverse md:flex-row">
      <ItineraryProvider>
        <Title>Create New Plan</Title>
        <PageContent />
      </ItineraryProvider>
    </div>
  );
};

const PageContent = () => {
  const { planId } = useParams();
  const { loading, error } = useItinerary();

  if (!planId) return <StartPrompt />;

  return (
    <>
      {loading && <SidebarSkeleton />}
      {!loading && error && <div>Error: {error}</div>}
      {!loading && !error && (
        <>
          <Title>Editing the Plan</Title>
          <Sidebar />
          <PlacesProvider>
            <MapBox />
          </PlacesProvider>
        </>
      )}
    </>
  );
};

export default CreatePage;
