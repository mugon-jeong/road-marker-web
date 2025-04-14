"use client";

import { getTimezone } from "@/app/(main)/travels/[id]/_actions/google-actions";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  latitude: number;
  longitude: number;
  isLoading: boolean;
  errorMsg: string;
  timeZoneId?: string;
  timeZoneName?: string;
  rawOffset?: number;
  dstOffset?: number;
  centerLat: number;
  centerLng: number;
  setMapCenter: (lat: number, lng: number) => void;
  fetchTimeZone: (lat: number, lng: number) => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const { curLocation, isLoading, errorMsg } = useGeoLocation();
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: curLocation.latitude,
    lng: curLocation.longitude,
  });
  const [timeZoneInfo, setTimeZoneInfo] = useState<{
    timeZoneId?: string;
    timeZoneName?: string;
    rawOffset?: number;
    dstOffset?: number;
  }>({
    timeZoneId: undefined,
    timeZoneName: undefined,
    rawOffset: undefined,
    dstOffset: undefined,
  });

  const fetchTimeZone = async (lat: number, lng: number) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const response = await getTimezone(lat, lng, timestamp);

      setTimeZoneInfo({
        timeZoneId: response.timeZoneId,
        timeZoneName: response.timeZoneName,
        rawOffset: response.rawOffset,
        dstOffset: response.dstOffset,
      });
    } catch (error) {
      console.error("Failed to fetch timezone:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && !errorMsg) {
      fetchTimeZone(curLocation.latitude, curLocation.longitude);
    }
  }, [curLocation.latitude, curLocation.longitude, isLoading, errorMsg]);

  const value = {
    latitude: curLocation.latitude,
    longitude: curLocation.longitude,
    isLoading,
    errorMsg,
    ...timeZoneInfo,
    centerLat: mapCenter.lat,
    centerLng: mapCenter.lng,
    setMapCenter: (lat: number, lng: number) => setMapCenter({ lat, lng }),
    fetchTimeZone,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
