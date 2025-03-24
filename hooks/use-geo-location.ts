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

const geoOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000, // 10초로 증가
  maximumAge: 1000, // 1초 이내의 캐시된 위치 허용
};

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>(defaultLocation);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isWatching, setIsWatching] = useState<boolean>(false);

  const setDefaultLocation = () => {
    setLocation(defaultLocation);
  };

  const showError = useCallback((error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorMsg("사용자가 위치 정보를 제공하는 것을 거부했습니다.");
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

  const getCurrentLocation = useCallback(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setErrorMsg("이 브라우저는 위치 정보를 지원하지 않습니다.");
      return Promise.reject("Geolocation not supported");
    }

    setIsLoading(true);
    setErrorMsg(""); // 이전 에러 메시지 초기화

    return new Promise<LocationType>((resolve, reject) => {
      // 타임아웃 백업
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setErrorMsg("위치 정보를 가져오는데 실패했습니다. 다시 시도해주세요.");
        reject(new Error("Manual timeout"));
      }, 12000);

      geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          const { latitude, longitude } = position.coords;
          const currentLocation = { latitude, longitude };
          setLocation(currentLocation);
          setIsLoading(false);
          setErrorMsg("");
          resolve(currentLocation);
        },
        (error) => {
          clearTimeout(timeoutId);
          showError(error);
          reject(error);
        },
        geoOptions
      );
    });
  }, [showError]);

  const startWatching = useCallback(() => {
    const { geolocation } = navigator;
    if (!geolocation) return;

    setIsLoading(true);
    setIsWatching(true);

    const watchId = geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLoading(false);
        setErrorMsg("");
      },
      showError,
      geoOptions
    );

    return () => {
      geolocation.clearWatch(watchId);
      setIsWatching(false);
    };
  }, [showError]);

  const stopWatching = useCallback(() => {
    setIsWatching(false);
  }, []);

  useEffect(() => {
    const cleanup = startWatching();
    return () => {
      cleanup?.();
    };
  }, [startWatching]);

  return {
    curLocation: location,
    isLoading,
    errorMsg,
    isWatching,
    startWatching,
    stopWatching,
    getCurrentLocation,
  };
};
