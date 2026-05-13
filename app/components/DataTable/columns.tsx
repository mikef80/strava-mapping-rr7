import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { StravaActivity } from "~/types/strava";

export const columns: ColumnDef<StravaActivity>[] = [
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const formatted = format(new Date(row.getValue("start_date")), "d MMM yyyy");
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Exercise Type",
    cell: ({ row }) => {
      return <div>{row.getValue("type")}</div>;
    },
  },
  {
    id: "distance_miles",
    accessorFn: (row) => row.distance / 1609.34,
    header: "Distance (mi)",
    cell: ({ row }) => {
      return <div>{Number(row.getValue("distance_miles")).toFixed(2)}</div>;
    },
  },
  {
    id: "distance_kilometres",
    accessorFn: (row) => row.distance / 1000,
    header: "Distance (km)",
    cell: ({ row }) => {
      return <div>{Number(row.getValue("distance_kilometres")).toFixed(2)}</div>;
    },
  },
];