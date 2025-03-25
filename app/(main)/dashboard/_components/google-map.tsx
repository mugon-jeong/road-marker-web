"use client";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React from "react";

const GoogleMap = () => {
  const { curLocation, errorMsg, isLoading, getCurrentLocation } =
    useGeoLocation();
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS!}>
      <Map
        defaultCenter={{
          lat: curLocation.latitude,
          lng: curLocation.longitude,
        }}
        defaultZoom={15}
        mapId="DEMO_MAP_ID"
        disableDefaultUI={false}
        gestureHandling={"greedy"}
      >
        <AdvancedMarker
          position={{
            lat: curLocation.latitude,
            lng: curLocation.longitude,
          }}
        />
      </Map>
      <Button
        onClick={getCurrentLocation}
        className="absolute bottom-4 right-4 z-10"
      >
        현재 위치로
      </Button>
    </APIProvider>
  );
};

export default GoogleMap;
