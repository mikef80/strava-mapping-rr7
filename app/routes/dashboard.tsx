import { useState } from "react";
import { useLoaderData } from "react-router";
import { commitSession, getSession } from "~/utils/session.server";
import { getActivities, refreshAccessToken } from "~/utils/strava.server";
import type { Route } from "../+types/root";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  let accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");

  const headers = new Headers();

  if (Date.now() / 1000 > expiresAt) {
    const refreshToken = session.get("refreshToken");
    const refreshed = await refreshAccessToken(refreshToken);

    session.set("accessToken", refreshed.access_token);
    session.set("refreshToken", refreshed.refresh_token);
    session.set("expiresAt", refreshed.expires_at);

    accessToken = refreshed.access_token;
    headers.set("Set-Cookie", await commitSession(session));
  }

  const activities = await getActivities(accessToken);

  return Response.json(activities, { headers });
};

const Dashboard = () => {
  const [activities, setActivities] = useState(useLoaderData());

  return <div>dashboard</div>;
};

export default Dashboard;
