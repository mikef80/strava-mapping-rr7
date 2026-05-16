import { Suspense, useState } from "react";
import { ClientOnly } from "../ClientOnly/ClientOnly";
import Leaflet from "../Leaflet/Leaflet.client";
import type { StravaActivity, StravaAthlete } from "~/types/strava";
import { DataTable } from "../DataTable/DataTable";
import { columns } from "../DataTable/columns";
import Header from "../Header/Header";
import Athlete from "../Athlete/Athlete";
import AthleteCharts from "../AthleteCharts/AthleteCharts";

const DashboardContent = ({
  activities,
  athlete,
}: {
  activities: StravaActivity[];
  athlete: StravaAthlete;
}) => {
  const [mapActivities, setMapActivities] = useState<StravaActivity[]>(activities);

  return (
    <main className=' flex flex-col p-4 gap-4'>
      <Header />
      <div className='grid grid-cols-2 gap-4'>
        <Athlete athlete={athlete} activities={activities} />
        <AthleteCharts athlete={athlete} activities={mapActivities} />
      </div>
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
