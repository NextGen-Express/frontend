import React, { useEffect, useState } from "react";

function getGroundDirection(origin, destination) {
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirection(response);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [origin, destination]);

  return direction;
}

export default getGroundDirection;
