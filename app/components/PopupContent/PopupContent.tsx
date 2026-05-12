import type { StravaActivity } from "~/types/strava";
import { ExternalLink } from "lucide-react";

const PopupContent = ({ activity }: { activity: StravaActivity }) => {
  const duration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
  };

  return (
    <div className={"flex flex-col gap-1.5"}>
      <a
        href={`https://www.strava.com/activities/${activity.id}`}
        target='_blank'
        className='text-inherit flex justify-between items-center'>
        <h2 className={"text-lg"}>{activity.name}</h2>
        <ExternalLink size={14} />
      </a>
      <div className={"flex justify-between text-base text-gray-400 gap-10"}>
        <div className={""}>{activity.type}</div>
        <div className={""}>
          {new Date(activity.start_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      <div className={""}>Duration: {activity.elapsed_time}</div>
      <time></time>
      <div className={""}>Miles: {(activity.distance / 1609.34).toFixed(2)} mi</div>
      <div className={""}>Kilometres: {(activity.distance / 1000).toFixed(2)} km</div>
    </div>
  );
};

export default PopupContent;
