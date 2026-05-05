import type { Route } from "../+types/root";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const scope = url.searchParams.get("scope");

  console.log(state);
  console.log(code);
  console.log(scope);

  const data = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code: code,
    grant_type: "authorization_code",
  };

  const res = await fetch(`https://www.strava.com/api/v3/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  console.log(json, "<--json");
};
