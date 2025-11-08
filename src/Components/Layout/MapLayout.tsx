import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/Components/Header";
import { APIProvider } from "@vis.gl/react-google-maps";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

function MapLayout() {
  if (!GOOGLE_MAPS_API_KEY) {
    console.error("Missing Google Maps API key. Set VITE_GOOGLE_MAP_API_KEY.");
    return <div>Map configuration error. Please contact support.</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="relative mx-auto px-2 sm:px-3 w-full max-w-[1300px] box-border">
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
        >
          <Header withBanner={false} />
        </GoogleOAuthProvider>
      </div>

      <div className="flex-1">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Outlet />
        </APIProvider>
      </div>
    </div>
  );
}

export default MapLayout;
