"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/providers/location-provider";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { MapSearchAutocomplete } from "./map-search-autocomplete";

import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

import PlaceDetails from "./place-details";
const MIN_ZOOM = 3;
const MAX_ZOOM = 20;
const DEFAULT_ZOOM = 12;

const GoogleMap = () => {
  const [current, setCurrent] = useState<{ lat: number; lng: number }>();
  const { latitude, longitude, setMapCenter } = useLocation();
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [places, setPlaces] = useState<google.maps.places.Place[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

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
        onIdle={(map) => {
          if (!mapInstance && map instanceof google.maps.Map)
            setMapInstance(map);
        }}
        onCenterChanged={(center) => {
          if (center.type === "center_changed") {
            setMapCenter(center.detail.center.lat, center.detail.center.lng);
          }
        }}
      >
        <MapControl position={ControlPosition.TOP_LEFT}>
          <div className="p-2">
            <MapSearchAutocomplete
              onPlaceSelect={(place) => {
                if (place) {
                  setPlaces([place]);
                  setIsDrawerOpen(true);
                }
              }}
              center={current || { lat: latitude, lng: longitude }}
              selectedTypes={selectedTypes}
              onTypesChange={setSelectedTypes}
              onNearbyPlaces={(nearbyPlaces) => setPlaces(nearbyPlaces)}
            />
          </div>
        </MapControl>
        <MapControl position={ControlPosition.RIGHT_CENTER}>
          <div className="p-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </MapControl>
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
        {places.map((place, index) => (
          <AdvancedMarker
            key={`${place.id}-${index}`}
            position={place.location}
            onClick={() => {
              setPlaces([...places]);
              setIsDrawerOpen(true);
              if (place.viewport && mapInstance)
                mapInstance.fitBounds(place.viewport);
            }}
          >
            <Pin
              background={place.iconBackgroundColor}
              glyph={
                place.svgIconMaskURI ? new URL(place.svgIconMaskURI) : null
              }
            />
          </AdvancedMarker>
        ))}
      </Map>
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="right"
      >
        <DrawerContent>
          <DrawerHeader className="border-b">
            <div className="flex justify-between items-center">
              <DrawerTitle>장소 목록</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <PlaceDetails places={places} />
        </DrawerContent>
      </Drawer>
    </APIProvider>
  );
};

export default GoogleMap;
