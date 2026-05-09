import { useMapEvents } from "react-leaflet";

const MapCoords = () => {
  const map = useMapEvents({
    drag: () => {
      console.log(map.locate());
    },
  });
  return null;
};

export default MapCoords;
