import { redirect } from "react-router";
import type { Route } from "../+types/root";

/* export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
} */

export const loader = () => {
  return redirect("/dashboard");
};
