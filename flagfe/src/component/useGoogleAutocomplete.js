import { useEffect } from "react";

const useGoogleAutocomplete = (inputId, setInputValue) => {
  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps JavaScript API is not loaded.");
      return;
    }

    const inputElement = document.getElementById(inputId);

    if (!inputElement) {
      console.error(`Element with id "${inputId}" not found.`);
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputElement
    );

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    inputElement.addEventListener("input", handleInputChange);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setInputValue(place.formatted_address);
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
      inputElement.removeEventListener("input", handleInputChange);
    };
  }, [inputId, setInputValue]);
};

export default useGoogleAutocomplete;
