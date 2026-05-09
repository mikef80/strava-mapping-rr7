import { readFile, writeFile } from "node:fs/promises";
import type { StravaActivity, StravaTokenResponse } from "~/types/strava";

/*
getStravaAuthUrl()

exchangeCodeForToken(code)

refreshAccessToken(refreshToken)

getActivities(accessToken)

TODO getAthlete(accessToken) 
*/

export const getStravaAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    redirect_uri: "http://localhost:5173/auth/callback",
    response_type: "code",
    approval_prompt: "auto",
    scope: "activity:read_all",
    state: "testing",
  });

  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string) => {
  const res = await fetch(`https://www.strava.com/api/v3/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
    }),
  });

  const data: StravaTokenResponse = await res.json();

  return data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const res = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data: StravaTokenResponse = await res.json();

  return data;
};

export const getActivities = async (accessToken: string) => {
  const perPage = 200;
  let page = 1;
  const activities: StravaActivity[] = [];

  try {
    const cached = await readFile("./app/data/data.json", "utf8");
    console.log("using cache");
    return JSON.parse(cached);
  } catch {
    console.log("fetching from strava");
  }

  while (true) {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Strava API error: ${res.status}`);
    }

    const data: StravaActivity[] = await res.json();

    if (!data.length) break;

    activities.push(...data);

    if (data.length < perPage) break;

    page++;
  }

  await writeFile("./app/data/data.json", JSON.stringify(activities, null, 2), "utf8");

  return activities;
};
