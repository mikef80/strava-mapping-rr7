import type { StravaAthlete, StravaActivity } from "~/types/strava";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const AthleteCharts = ({
  athlete,
  activities,
}: {
  athlete: StravaAthlete;
  activities: StravaActivity[];
}) => {
  const [selectedTypes, setSelectedTypes] = useState(["Run", "Walk"]);
  const years = [
    ...new Set(activities.map((a) => new Date(a.start_date).getFullYear())),
  ].sort();
  const colours: Record<string, string> = {
    Walk: "brown",
    Workout: "red",
    Run: "green",
    Surfing: "aqua",
    Swim: "blue",
    Hike: "orange",
    Ride: "yellow",
  };

  const activityTypes = [...new Set(activities.map((a) => a.type))];

  const chartData = years.map((year) => {
    const entry: Record<string, any> = { year };

    activityTypes.forEach((type) => {
      entry[type] = activities.filter(
        (a) => new Date(a.start_date).getFullYear() === year && a.type === type,
      ).length;
    });
    return entry;
  });

  const toggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <div className='flex flex-col h-full border rounded-lg'>
      <div
        className='grid gap-2'
        style={{ gridTemplateColumns: `repeat(${activityTypes.length}, 1fr)` }}>
        {activityTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggle(type)}
            className={
              selectedTypes.includes(type)
                ? "bg-cyan-400 px-3 py-1 rounded"
                : "bg-gray-200 px-3 py-1 rounded"
            }>
            {type}
          </button>
        ))}
      </div>
      <div className='flex-1 mt-2'>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <XAxis dataKey={"year"} />
            <YAxis />
            <Tooltip />
            {selectedTypes.map((s) => (
              <Line type={"monotone"} dataKey={s} stroke={colours[s]} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AthleteCharts;
