"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/providers/location-provider";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const MIN_ZOOM = 3;
const MAX_ZOOM = 20;
const DEFAULT_ZOOM = 12;

const GoogleMap = () => {
  const [current, setCurrent] = useState<{ lat: number; lng: number }>();
  const { latitude, longitude, setMapCenter } = useLocation();
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, MIN_ZOOM));
  };

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
        zoom={zoom}
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
          <div className="flex flex-col items-end gap-4 p-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <Minus />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <Plus />
            </Button>
            <Button onClick={handleCurrentLocation}>현재 위치로</Button>
          </div>
        </MapControl>
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
