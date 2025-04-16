import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

export type UseNearbySearchReturn = {
  places: google.maps.places.Place[];
  isLoading: boolean;
  search: () => Promise<void>;
};

export type UseNearbySearchOptions = {
  center: { lat: number; lng: number };
  radius?: number;
  includedPrimaryTypes?: string[];
  maxResultCount?: number;
  rankPreference?: google.maps.places.SearchNearbyRankPreference;
  language?: string;
  region?: string;
};

/**
 * A reusable hook that searches for nearby places using the Google Places API.
 * The data is loaded from the Places API's Nearby Search feature.
 *
 * @param options The options for the nearby search request including center coordinates,
 *   radius, place types, and other search parameters.
 *
 * @returns An object containing the nearby places and the current loading status.
 *
 * @example
 * ```jsx
 * const MyComponent = () => {
 *   const center = new google.maps.LatLng(52.369358, 4.889258);
 *   const { places, isLoading } = useNearbySearch({
 *     center,
 *     radius: 500,
 *     includedPrimaryTypes: ['restaurant']
 *   });
 *
 *   return (
 *     <div>
 *       {isLoading ? (
 *         <p>Loading...</p>
 *       ) : (
 *         <ul>
 *           {places.map((place) => (
 *             <li key={place.id}>{place.displayName}</li>
 *           ))}
 *         </ul>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useNearbySearch(
  options: UseNearbySearchOptions
): UseNearbySearchReturn {
  const placesLib = useMapsLibrary("places");
  const [places, setPlaces] = useState<google.maps.places.Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchNearby = useCallback(async () => {
    if (!placesLib) return;

    const { Place, SearchNearbyRankPreference } = placesLib;
    setIsLoading(true);

    try {
      if (options.includedPrimaryTypes?.length === 0) return;
      const request = {
        fields: [
          "displayName",
          "location",
          "businessStatus",
          "viewport",
          "svgIconMaskURI",
          "iconBackgroundColor",
          "id",
        ],
        locationRestriction: {
          center: new google.maps.LatLng(
            options.center.lat,
            options.center.lng
          ),
          radius: options.radius || 500,
        },
        includedPrimaryTypes: options.includedPrimaryTypes,
        maxResultCount: options.maxResultCount || 5,
        rankPreference:
          options.rankPreference || SearchNearbyRankPreference.POPULARITY,
        language: options.language || "en-US",
        region: options.region || "us",
      };
      console.log("request", request); // log the request object to the console for debugging purposes

      const { places: searchResults } = await Place.searchNearby(request);
      setPlaces(searchResults);
    } catch (error) {
      console.error("Error searching nearby places:", error);
      setPlaces([]);
    } finally {
      setIsLoading(false);
    }
  }, [placesLib, options]);

  useEffect(() => {
    if (!placesLib) return;

    const { Place, SearchNearbyRankPreference } = placesLib;
    setIsLoading(true);

    try {
      if (options.includedPrimaryTypes?.length === 0) return;
      const request = {
        fields: [
          "displayName",
          "location",
          "businessStatus",
          "viewport",
          "svgIconMaskURI",
          "iconBackgroundColor",
          "id",
        ],
        locationRestriction: {
          center: new google.maps.LatLng(
            options.center.lat,
            options.center.lng
          ),
          radius: options.radius || 500,
        },
        includedPrimaryTypes: options.includedPrimaryTypes,
        maxResultCount: options.maxResultCount || 5,
        rankPreference:
          options.rankPreference || SearchNearbyRankPreference.POPULARITY,
        language: options.language || "en-US",
        region: options.region || "us",
      };
      console.log("request", request); // log the request object to the console for debugging purposes

      Place.searchNearby(request).then((res) => {
        setPlaces(res.places);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error searching nearby places:", error);
      setPlaces([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    options.center.lat,
    options.center.lng,
    options.includedPrimaryTypes,
    options.language,
    options.maxResultCount,
    options.radius,
    options.rankPreference,
    options.region,
    placesLib,
  ]);

  return {
    places,
    isLoading,
    search: searchNearby,
  };
}
