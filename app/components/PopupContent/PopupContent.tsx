import type { ReactNode } from "react";

import styles from "./PopupContent.module.scss";
import type { StravaActivity } from "~/types/strava";

const PopupContent = ({ activity }: { activity: StravaActivity }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{activity.name}</h2>
      <div className={styles.title}>
        <div className={styles.date}>
          {new Date(activity.start_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className={styles.type}>{activity.type}</div>
      </div>
      <div className={styles.mi}>Miles: {(activity.distance / 1609.34).toFixed(2)} mi</div>
      <div className={styles.km}>Kilometres: {(activity.distance / 1000).toFixed(2)} km</div>
    </div>
  );
};

export default PopupContent;
