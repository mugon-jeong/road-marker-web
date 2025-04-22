"use client";

import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";

interface MapMarkerProps {
  place: google.maps.places.Place;
  index: number;
  mapInstance: google.maps.Map | null;
  onMarkerClick: (place: google.maps.places.Place) => void;
}

export const MapMarker = ({
  place,
  index,
  mapInstance,
  onMarkerClick,
}: MapMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <AdvancedMarker
        key={`${place.id}-${index}`}
        ref={markerRef}
        position={place.location}
        onClick={() => {
          setIsSelected(true);
          onMarkerClick(place);
          if (place.viewport && mapInstance) {
            mapInstance.fitBounds(place.viewport);
          }
        }}
      >
        <Pin
          background={place.iconBackgroundColor}
          glyph={place.svgIconMaskURI ? new URL(place.svgIconMaskURI) : null}
        />
      </AdvancedMarker>
      {isSelected && (
        <InfoWindow
          anchor={marker}
          maxWidth={300}
          onCloseClick={() => setIsSelected(false)}
          headerContent={
            <h3 className="font-semibold mb-2">{place.displayName}</h3>
          }
        >
          <div className="p-2">
            {place.formattedAddress && (
              <p className="text-sm text-muted-foreground mb-2">
                {place.formattedAddress}
              </p>
            )}
            {place.rating && (
              <p className="text-sm">
                ⭐ {place.rating} / 5.0 ({place.userRatingCount}개의 평가)
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </>
  );
};
