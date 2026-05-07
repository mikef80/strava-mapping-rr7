import { exchangeCodeForToken } from "~/utils/strava.server";
import type { Route } from "../../+types/root";
import { commitSession, getSession } from "~/utils/session.server";
import { redirect } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const code: string = url.searchParams.get("code") || "";

  if (!code) throw new Error("No code returned from login");

  const data = await exchangeCodeForToken(code);

  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", data.access_token);
  session.set("refreshToken", data.refresh_token);
  session.set("expiresAt", data.expires_at);

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};
