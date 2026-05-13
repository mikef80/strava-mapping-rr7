import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { StravaActivity } from "~/types/strava";
import { Button } from "../ui/button";

export const columns: ColumnDef<StravaActivity>[] = [
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Start Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = format(new Date(row.getValue("start_date")), "d MMM yyyy");
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Exercise Type
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("type")}</div>;
    },
  },
  {
    id: "distance_miles",
    accessorFn: (row) => row.distance / 1609.34,
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Distance (mi)
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{Number(row.getValue("distance_miles")).toFixed(2)}</div>;
    },
  },
  {
    id: "distance_kilometres",
    accessorFn: (row) => row.distance / 1000,
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Distance (km)
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{Number(row.getValue("distance_kilometres")).toFixed(2)}</div>;
    },
  },
];
