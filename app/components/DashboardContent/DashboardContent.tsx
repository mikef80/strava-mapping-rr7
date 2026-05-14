import { Suspense, useState } from "react";
import { ClientOnly } from "../ClientOnly/ClientOnly";
import Leaflet from "../Leaflet/Leaflet.client";
import type { StravaActivity } from "~/types/strava";
import { DataTable } from "../DataTable/DataTable";
import { columns } from "../DataTable/columns";

const DashboardContent = ({ activities }: { activities: StravaActivity[] }) => {
  const [mapActivities, setMapActivities] = useState<StravaActivity[]>(activities);

  return (
    <main className='h-full flex flex-col p-4 gap-4'>
      <h1 className='text-2xl'>Strava</h1>
      <DataTable
        columns={columns}
        data={activities}
        onMapActivitiesChange={setMapActivities}
      />
      {
        <ClientOnly>
          {() => (
            <Suspense fallback={<div>Loading map...</div>}>
              <Leaflet activities={mapActivities} />
            </Suspense>
          )}
        </ClientOnly>
      }
    </main>
  );
};

export default DashboardContent;
