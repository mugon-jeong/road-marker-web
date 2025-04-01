"use client";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geo-location";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

const GoogleMap = () => {
  const [current, setCurrent] = useState<{ lat: number; lng: number }>();
  const { curLocation } = useGeoLocation();

  const handleCurrentLocation = () => {
    setCurrent({
      lat: curLocation.latitude,
      lng: curLocation.longitude,
    });
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS!}>
      <Map
        defaultCenter={{
          lat: 37.579293849225756,
          lng: 126.97798076343491,
        }}
        center={current}
        zoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"road-marker"}
      >
        <MapControl position={ControlPosition.BOTTOM_RIGHT}>
          <Button onClick={handleCurrentLocation}>현재 위치로</Button>
        </MapControl>
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
