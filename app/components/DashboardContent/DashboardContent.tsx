import { Suspense } from "react";
import { ClientOnly } from "../ClientOnly/ClientOnly";
import Leaflet from "../Leaflet/Leaflet.client";
import type { StravaActivity } from "~/types/strava";

import styles from "./DashboardContent.module.scss";

const DashboardContent = ({ activities }: { activities: StravaActivity[] }) => {
  return (
    <main>
      <h1>Strava</h1>
      <ClientOnly>
        {() => (
          <Suspense fallback={<div>Loading map...</div>}>
            <Leaflet activities={activities} />
          </Suspense>
        )}
      </ClientOnly>
    </main>
  );
};

export default DashboardContent;
