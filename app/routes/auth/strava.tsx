import { redirect } from "react-router";

export const loader = async () => {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    redirect_uri: "http://localhost:5173/auth/callback",
    response_type: "code",
    approval_prompt: "auto",
    scope: "activity:read_all",
    state: "testing",
  });

  return redirect(`https://www.strava.com/oauth/authorize?${params.toString()}`);
};
