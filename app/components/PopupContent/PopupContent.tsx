import type { StravaActivity } from "~/types/strava";
import { ExternalLink } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";

const PopupContent = ({ activity }: { activity: StravaActivity }) => {
  const duration = intervalToDuration({ start: 0, end: activity.elapsed_time * 1000 });

  const isoDuration = [
    "PT",
    duration.hours ? `${duration.hours}H` : "",
    duration.minutes ? `${duration.minutes}M` : "",
    duration.seconds ? `${duration.seconds}S` : "",
  ].join("");

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
        <div>{activity.type}</div>
        <div>
          {new Date(activity.start_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      <time dateTime={isoDuration}>Duration: {formatDuration(duration)}</time>
      <div>Miles: {(activity.distance / 1609.34).toFixed(2)} mi</div>
      <div>Kilometres: {(activity.distance / 1000).toFixed(2)} km</div>
    </div>
  );
};

export default PopupContent;
