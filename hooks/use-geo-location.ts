"use client";

import { useCallback, useEffect, useState } from "react";

type LocationType = {
  latitude: number;
  longitude: number;
};

const defaultLocation: LocationType = {
  latitude: 37.579293849225756,
  longitude: 126.97798076343491,
};

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>(defaultLocation);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const setDefaultLocation = () => {
    setLocation(defaultLocation);
  };

  const showError = useCallback((error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorMsg("사용자가 위치 정보를 제공허는 것을 거부했습니다. ");
        setDefaultLocation();
        break;
      case error.POSITION_UNAVAILABLE:
        setErrorMsg("위치 정보를 사용할 수 없습니다.");
        break;
      case error.TIMEOUT:
        setErrorMsg("위치 정보를 가져오는 요청이 시간 초과되었습니다.");
        break;
      default:
        setErrorMsg("알 수 없는 오류가 발생했습니다.");
        break;
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) return;

    setIsLoading(true);
    geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        setIsLoading(false);
      },
      (err) => showError(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [showError]);

  return {
    curLocation: location,
    isLoading,
    errorMsg,
  };
};
