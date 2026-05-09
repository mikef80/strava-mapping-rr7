import { MapContainer, Popup, TileLayer, useMap, Polyline } from "react-leaflet";
import type { StravaActivity } from "~/types/strava";
import polyline from "@mapbox/polyline";
import { useEffect, useState } from "react";
import MapCoords from "./MapCoords";
import { LatLngBounds } from "leaflet";

function FitBounds({ activities }: { activities: StravaActivity[] }) {
  const map = useMap();
  useEffect(() => {
    const allPositions = activities
      .filter((a) => a.map.summary_polyline)
      .flatMap((a) => polyline.decode(a.map.summary_polyline!));

    if (allPositions.length > 0) {
      map.fitBounds(new LatLngBounds(allPositions));
    }
  }, [activities, map]);
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
        scrollWheelZoom={true}
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
        <FitBounds activities={activities} />
        {activities.map((activity) => (
          <Polyline
            key={activity.id}
            positions={polyline.decode(activity.map.summary_polyline!)}
            color='blue'>
            <Popup>
              <h2>{activity.name}</h2>
              <p>{activity.type}</p>
              <p>
                {new Date(activity.start_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>{(activity.distance / 1609.34).toFixed(2)} mi</p>
              <p>{(activity.distance / 1000).toFixed(2)} km</p>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
};

export default Leaflet;
