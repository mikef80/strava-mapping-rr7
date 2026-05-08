import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, Polyline } from "react-leaflet";
import type { StravaActivity } from "~/types/strava";
import polyline from "@mapbox/polyline";
import { useEffect, useState } from "react";

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
  const [position, setPosition] = useState<{ lat: number; long: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({ lat: position.coords.latitude, long: position.coords.longitude });
      },
      () => setPosition({ lat: 0, long: 0 }),
    );
  }, []);

  if (!position) return null;

  return (
    <div id='map' style={{ height: "100%" }}>
      <MapContainer
        center={[position.lat, position.long]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        worldCopyJump
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={0.8}>
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
      </MapContainer>
    </div>
  );
};

export default Leaflet;
