import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/Components/Header";
import NotificationBar from "@/pages/HomePage/NotificationBar";
import { APIProvider } from "@vis.gl/react-google-maps";
import { PlansProvider } from "@/pages/MapView/PlansContext";

function MapLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="relative mx-auto px-2 sm:px-3 w-full max-w-[1300px] box-border">
        <NotificationBar />
        <Header withBanner={false} />
      </div>

      <div className="flex-1">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
          <PlansProvider>
            <Outlet />
          </PlansProvider>
        </APIProvider>
      </div>
    </div>
  );
}

export default MapLayout;
