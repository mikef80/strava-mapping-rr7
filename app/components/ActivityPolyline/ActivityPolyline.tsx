import polyline from "@mapbox/polyline";
import { useEffect, useRef } from "react";
import { Polyline, Popup } from "react-leaflet";
import { activityColours } from "~/types/activityColours";
import type { StravaActivity } from "~/types/strava";
import PopupContent from "../PopupContent/PopupContent";

const ActivityPolyline = ({
  activity,
  selected,
  setSelected,
}: {
  activity: StravaActivity;
  selected: boolean;
  setSelected: (id: number) => void;
}) => {
  const ref = useRef<L.Polyline>(null);
  const glowRef = useRef<L.Polyline>(null);
  const colours = activityColours[activity.type as keyof typeof activityColours];

  useEffect(() => {
    if (selected) {
      ref.current?.bringToFront();
      glowRef.current?.bringToFront();
    }
  }, [selected]);

  return (
    <>
      {selected && (
        <Polyline
          ref={glowRef}
          positions={polyline.decode(activity.map.summary_polyline!)}
          pathOptions={{
            color: selected ? colours.selected : colours.base,
            weight: 10,
            opacity: 0.4,
          }}
        />
      )}
      <Polyline
        ref={ref}
        positions={polyline.decode(activity.map.summary_polyline!)}
        pathOptions={{
          color: selected ? colours.selected : colours.base,
        }}
        eventHandlers={{
          click: () => {
            setSelected(activity.id);
          },
        }}>
        <Popup>
          <PopupContent activity={activity} />
        </Popup>
      </Polyline>
    </>
  );
};

export default ActivityPolyline;
