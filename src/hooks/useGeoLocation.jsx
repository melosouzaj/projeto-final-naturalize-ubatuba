import { useEffect, useState } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (locationCoords) => {
    setLocation({
      loaded: true,
      coordinates: { 
        lat: -23.438355778386438,
        lng: -45.072581353144315,
      },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}

export { useGeoLocation };