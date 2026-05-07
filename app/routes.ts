import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("auth", "routes/auth/strava.tsx"),
  route("auth/callback", "routes/auth/strava.callback.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
