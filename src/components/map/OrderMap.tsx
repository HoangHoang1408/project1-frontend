import mapboxgl, { Map } from "mapbox-gl";
import React, { FC, useEffect, useRef } from "react";
mapboxgl.accessToken =
  "pk.eyJ1IjoiaG9hbmcxNDgyMDAyIiwiYSI6ImNrenh4YWxpODA1djQybm8zaWoxd3g5dGcifQ.y-vcjvs8OhXXSYw9NSUzQw";
interface Props {
  lat: number;
  lng: number;
}
const OrderMap: FC<Props> = ({ lat, lng }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 14.8,
      scrollZoom: false,
    });
    // Create a new marker.
    new mapboxgl.Marker({
      color: "#f50707",
    })
      .setLngLat([lng, lat])
      .addTo(map.current);
  });
  return <div ref={mapContainer} className="w-full h-full" />;
};

export default OrderMap;
//   const OrderMap = () => {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef<Map | null>(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);
//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current as HTMLElement,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });
//   useEffect(() => {
//     if (!map.current) return;
//     map.current.on("move", () => {
//       if (!map.current) return;
//       setLng(+map.current.getCenter().lng.toFixed(4));
//       setLat(+map.current.getCenter().lat.toFixed(4));
//       setZoom(+map.current.getZoom().toFixed(2));
//     });
//   });
//   return <div ref={mapContainer} className="w-full h-full" />;
// };
