import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth/strava.tsx"),
  route("auth/callback", "routes/auth/strava.callback.tsx"),
] satisfies RouteConfig;
