"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/providers/location-provider";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { MapSearchAutocomplete } from "./map-search-autocomplete";
import AutocompleteResult from "./autocomplete-result";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  PlaceDirectionsButton,
  IconButton,
  PlaceOverview,
} from "@googlemaps/extended-component-library/react";
const MIN_ZOOM = 3;
const MAX_ZOOM = 20;
const DEFAULT_ZOOM = 12;

const GoogleMap = () => {
  const [current, setCurrent] = useState<{ lat: number; lng: number }>();
  const { latitude, longitude, setMapCenter } = useLocation();
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <MapControl position={ControlPosition.TOP_LEFT}>
          <div className="p-2">
            <MapSearchAutocomplete
              onPlaceSelect={(place) => {
                setSelectedPlace(place);
                setIsDrawerOpen(true);
              }}
            />
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
        <AutocompleteResult place={selectedPlace} />
      </Map>
      <Drawer
        open={isDrawerOpen && selectedPlace !== null}
        onOpenChange={setIsDrawerOpen}
        direction="right"
      >
        <DrawerContent>
          <DrawerHeader className="border-b">
            <div className="flex justify-between items-center">
              <DrawerTitle>{selectedPlace?.displayName}</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {selectedPlace && (
              <PlaceOverview
                size="large"
                place={selectedPlace}
                googleLogoAlreadyDisplayed
              >
                <div slot="action" className="SlotDiv">
                  <IconButton slot="action" variant="filled">
                    See Reviews
                  </IconButton>
                </div>
                <div slot="action" className="SlotDiv">
                  <PlaceDirectionsButton slot="action" variant="filled">
                    Directions
                  </PlaceDirectionsButton>
                </div>
              </PlaceOverview>
            )}
            {selectedPlace?.formattedAddress && (
              <div>
                <h3 className="font-semibold mb-1">주소</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPlace.formattedAddress}
                </p>
              </div>
            )}
            {selectedPlace?.rating && (
              <div>
                <h3 className="font-semibold mb-1">평점</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPlace.rating} / 5.0 ({selectedPlace.userRatingCount}
                  개의 평가)
                </p>
              </div>
            )}
            {selectedPlace?.internationalPhoneNumber && (
              <div>
                <h3 className="font-semibold mb-1">전화번호</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPlace.internationalPhoneNumber}
                </p>
              </div>
            )}
            {selectedPlace?.websiteURI && (
              <div>
                <h3 className="font-semibold mb-1">웹사이트</h3>
                <a
                  href={selectedPlace.websiteURI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {selectedPlace.websiteURI}
                </a>
              </div>
            )}
            {selectedPlace?.regularOpeningHours && (
              <div>
                <h3 className="font-semibold mb-1">영업시간</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPlace.regularOpeningHours.weekdayDescriptions?.join(
                    "\n"
                  )}
                </p>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </APIProvider>
  );
};

export default GoogleMap;
