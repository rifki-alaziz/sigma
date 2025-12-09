// src/hooks/useGeoLocation.ts
import { useState, useEffect } from 'react';

export interface GeoLocationState {
  loaded: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
    height: number; // Ini Altitude (mdpl)
  };
  error?: {
    code: number;
    message: string;
  };
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocationState>({
    loaded: false,
    coordinates: {
      latitude: -6.200000, // Default Jakarta kalau belum allow
      longitude: 106.816666,
      height: 10, // Default ketinggian 10 mdpl (aman buat perhitungan)
    },
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // Kalau altitude null (hp gak support), kita fallback ke 10 meter
        height: location.coords.altitude || 10, 
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation((prev) => ({
      ...prev,
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
  };

  useEffect(() => {
    // Cek apakah browser support
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError);
      return;
    }

    // Minta izin akses lokasi (High Accuracy biar presisi buat sholat)
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true, 
      timeout: 15000, 
      maximumAge: 0 
    });
  }, []);

  return location;
};

export default useGeoLocation;