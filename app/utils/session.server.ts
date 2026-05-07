import { createCookieSessionStorage } from "react-router";

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    maxAge: 60 * 60 * 24 * 30,
  },
});
