import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, Polyline } from "react-leaflet";
import type { StravaActivity } from "~/types/strava";
import polyline from "@mapbox/polyline";
import { useEffect } from "react";

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(L.latLngBounds(positions));
    }
  }, [map, positions]);
  return null;
}

const Leaflet = ({ activities }: { activities: StravaActivity[] }) => {
  return (
    <div id='map' style={{ height: "100%" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {activities.map((activity) => (
          <Polyline
            key={activity.id}
            positions={polyline.decode(activity.map.summary_polyline!)}
            color='blue'
          />
        ))}
        {/* <FitBounds positions={positions} /> */}
      </MapContainer>
    </div>
  );
};

export default Leaflet;
