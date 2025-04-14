"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/providers/location-provider";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

const GoogleMap = () => {
  const [current, setCurrent] = useState<{ lat: number; lng: number }>();
  const { latitude, longitude, setMapCenter } = useLocation();

  const handleCurrentLocation = () => {
    setCurrent({
      lat: latitude,
      lng: longitude,
    });
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS!}>
      <Map
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        center={current}
        zoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"road-marker"}
        onCenterChanged={(center) => {
          if (center.type === "center_changed") {
            setMapCenter(center.detail.center.lat, center.detail.center.lng);
          }
        }}
      >
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <Button onClick={handleCurrentLocation}>현재 위치로</Button>
        </MapControl>
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
