export function handleSearch(pickupAddress, destination, setDirections) {
  const geocoder = new window.google.maps.Geocoder();
  const directionsService = new window.google.maps.DirectionsService();
  geocoder.geocode({ address: pickupAddress }, (pickupResults, status1) => {
    if (status1 === "OK") {
      geocoder.geocode(
        { address: destination },
        (destinationResults, status2) => {
          if (status2 === "OK") {
            const pickupLocation = pickupResults[0].geometry.location;
            const destinationLocation = destinationResults[0].geometry.location;
            const request = {
              origin: pickupLocation,
              destination: destinationLocation,
              travelMode: "DRIVING",
            };
            directionsService.route(request, (result, status3) => {
              if (status3 === "OK") {
                setDirections(result);
              } else {
                console.log("Directions request failed due to " + status3);
              }
            });
          } else {
            console.log(
              "Geocode was not successful for the following reason: " + status2
            );
          }
        }
      );
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status1
      );
    }
  });
}
