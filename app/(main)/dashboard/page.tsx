"use client";
import React, { useRef } from "react";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";

const page = () => {
  const mapRef = useRef<google.maps.Map>(null);
  const { curLocation, errorMsg, isLoading, getCurrentLocation } =
    useGeoLocation();

  const moveToCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const location = await getCurrentLocation();
      if (location) {
        mapRef.current?.panTo({
          lat: location.latitude,
          lng: location.longitude,
        });
        mapRef.current?.setZoom(15);
      }
    } catch (error) {
      console.error("위치 이동 실패:", error);
      // 사용자에게 에러 메시지 표시
      alert(
        errorMsg || "위치 정보를 가져오는데 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div className="h-full relative">
      {!isLoading && (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS!}>
          <Map
            ref={mapRef}
            defaultCenter={{
              lat: curLocation.latitude,
              lng: curLocation.longitude,
            }}
            defaultZoom={15}
            mapId="DEMO_MAP_ID"
            disableDefaultUI={false}
            gestureHandling={"greedy"}
          >
            <AdvancedMarker
              position={{
                lat: curLocation.latitude,
                lng: curLocation.longitude,
              }}
            />
          </Map>
          <Button
            onClick={moveToCurrentLocation}
            className="absolute bottom-4 right-4 z-10"
          >
            현재 위치로
          </Button>
        </APIProvider>
      )}
    </div>
  );
};

export default page;
