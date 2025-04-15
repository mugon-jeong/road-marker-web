import { useAutocompleteSuggestions } from "@/hooks/use-autocomplete-suggestions";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useCallback, useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";

interface Props {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
}

export const MapSearchAutocomplete = ({ onPlaceSelect }: Props) => {
  const places = useMapsLibrary("places");

  const [inputValue, setInputValue] = useState<string>("");
  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue);

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

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        value={inputValue}
        onValueChange={setInputValue}
        placeholder="Search for a place"
      />
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
