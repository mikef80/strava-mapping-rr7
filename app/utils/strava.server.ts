import { redirect } from "react-router";
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
  let page = 1;
  const perPage = 200;
  const activities = [];

  while (true) {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data: StravaActivity[] = await res.json();

    if (!data.length) break;

    activities.push(data);
    page++;
  }

  return activities.flat();
};
