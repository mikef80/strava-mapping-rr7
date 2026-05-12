import { Suspense } from "react";
import { ClientOnly } from "../ClientOnly/ClientOnly";
import Leaflet from "../Leaflet/Leaflet.client";
import type { StravaActivity } from "~/types/strava";

const DashboardContent = ({ activities }: { activities: StravaActivity[] }) => {
  return (
    <main className='h-full flex flex-col p-4 gap-4'>
      <h1 className='text-2xl'>Strava</h1>
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
