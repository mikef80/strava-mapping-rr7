import { commitSession, getSession } from "~/utils/session.server";
import { getActivities, getAthlete, refreshAccessToken } from "~/utils/strava.server";
import type { Route } from "./+types/dashboard";
import DashboardContent from "~/components/DashboardContent/DashboardContent";

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
  const athlete = await getAthlete(accessToken);

  return { activities, athlete, headers: Object.fromEntries(headers) };
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  return <DashboardContent activities={loaderData.activities} athlete={loaderData.athlete} />;
};

export default Dashboard;
