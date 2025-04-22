"use client";
import { useAutocompleteSuggestions } from "@/hooks/use-autocomplete-suggestions";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useNearbySearch } from "@/hooks/use-nearby-search";

interface Props {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
  onNearbyPlaces: (places: google.maps.places.Place[]) => void;
  onTypesChange: (types: string[]) => void;
  selectedTypes: string[];
  center: {
    lat: number;
    lng: number;
  };
}
const PLACE_TYPES = [
  "restaurant",
  "bar",
  "cafe",
  "lodging",
  "shopping_mall",
  "tourist_attraction",
];
export const MapSearchAutocomplete = ({
  onPlaceSelect,
  selectedTypes,
  onTypesChange,
  onNearbyPlaces,
  center,
}: Props) => {
  const places = useMapsLibrary("places");
  const [inputValue, setInputValue] = useState<string>("");

  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue);
  const searchOptions = useMemo(
    () => ({
      center: center,
      radius: 1000,
      includedPrimaryTypes: selectedTypes,
      maxResultCount: 20,
    }),
    [center, selectedTypes]
  );
  const { places: nearbyPlaces, reset: resetNearBy } =
    useNearbySearch(searchOptions);

  useEffect(() => {
    onNearbyPlaces(nearbyPlaces);
  }, [nearbyPlaces, onNearbyPlaces]);

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) return;
      if (!suggestion.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: [
          "viewport",
          "location",
          "svgIconMaskURI",
          "iconBackgroundColor",
          "id",
          "displayName",
        ],
      });

      setInputValue("");

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession();

      onPlaceSelect(place);
    },
    [places, onPlaceSelect, resetSession]
  );

  const togglePlaceType = async (type: (typeof PLACE_TYPES)[number]) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypesChange(newTypes);
    if (newTypes.length === 0) {
      resetNearBy();
      onNearbyPlaces([]);
    }
  };

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        value={inputValue}
        onValueChange={setInputValue}
        placeholder="Search for a place"
      />
      <div className="flex flex-wrap gap-2 p-2 border-t">
        {PLACE_TYPES.map((type) => (
          <Badge
            key={type}
            variant={selectedTypes.includes(type) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => {
              togglePlaceType(type);
            }}
          >
            {type}
          </Badge>
        ))}
      </div>
      <CommandList>
        {suggestions.length === 0 && inputValue && (
          <CommandEmpty>No places found.</CommandEmpty>
        )}
        {suggestions.map((suggestion, index) => (
          <CommandItem
            key={index}
            value={suggestion.placePrediction?.text.text}
            onSelect={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.placePrediction?.text.text}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
