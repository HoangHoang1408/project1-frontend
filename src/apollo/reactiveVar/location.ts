import { makeVar } from "@apollo/client";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config.json";

interface Location {
  lat: number;
  lng: number;
  address: string;
}
const LOCAL_LOCATION = "LOCAL_LOCATION";
const localLocation = localStorage.getItem(LOCAL_LOCATION);
const locationVar = makeVar<Location | null>(
  localLocation ? (JSON.parse(localLocation) as Location) : null
);
function getUserLocation() {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${config.MAP_BOX_PUBLIC_KEY}`
        )
        .then(({ data }) => {
          const locationObject: Location = {
            lat: latitude,
            lng: longitude,
            address: data?.features[0]?.place_name,
          };
          if (!locationObject.address)
            return toast.error(
              "Can not get your address. Please try again later!"
            );
          locationVar(locationObject);
          localStorage.setItem(LOCAL_LOCATION, JSON.stringify(locationObject));
        })
        .catch(() => {
          locationVar(null);
          localStorage.removeItem(LOCAL_LOCATION);
          toast.error("Can not get your location. Please try again later!");
        });
    },
    () => {
      toast.warning("Please enable your location for further service!", {
        autoClose: 4000,
      });
    }
  );
}
async function getRouteInfos(coords: { lat: number; lng: number }[]) {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coords
      .map(({ lat, lng }) => `${lng},${lat}`)
      .join(";")}?access_token=${config.MAP_BOX_PUBLIC_KEY}`
  );
  return data;
}
export { locationVar, getUserLocation, getRouteInfos };
