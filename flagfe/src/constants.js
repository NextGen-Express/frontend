import { useState } from "react";

export const cityCoordinates = {
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "New York": { lat: 40.7128, lng: -74.006 },
};

export function useMapSearch() {
  const [origin, setPickupAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [selectedCity, setSelectedCity] = useState("San Francisco");

  return {
    origin,
    setPickupAddress,
    destination,
    setDestination,
    directions,
    setDirections,
    selectedCity,
    setSelectedCity,
  };
}
