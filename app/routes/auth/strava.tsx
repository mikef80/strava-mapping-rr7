import { redirect } from "react-router";
import { getStravaAuthUrl } from "~/utils/strava.server";

export const loader = async () => {
  return redirect(getStravaAuthUrl());
};
