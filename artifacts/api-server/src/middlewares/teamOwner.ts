import { clerkClient, getAuth } from "@clerk/express";
import type { Request, RequestHandler } from "express";
import { getClerkProxyHost } from "./clerkProxyMiddleware";

export async function isTeamOwner(req: Request): Promise<boolean> {
  const { userId } = getAuth(req);
  const ownerEmail = process.env.TEAM_OWNER_EMAIL?.trim().toLowerCase();
  if (!userId || !ownerEmail) return false;
  const user = await clerkClient.users.getUser(userId);
  const primary = user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId);
  return primary?.verification?.status === "verified" &&
    primary.emailAddress.toLowerCase() === ownerEmail &&
    (!process.env.TEAM_OWNER_USER_ID || user.id === process.env.TEAM_OWNER_USER_ID);
}

export const requireTeamOwner: RequestHandler = async (req, res, next) => {
  if (!getAuth(req).userId) {
    res.status(401).json({ error: "Sign in to manage the team." });
    return;
  }
  try {
    if (!(await isTeamOwner(req))) {
      res.status(403).json({ error: "Team editing is restricted to the company owner." });
      return;
    }
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      const origin = req.get("origin");
      const expectedHost = getClerkProxyHost(req);
      if (req.get("sec-fetch-site") === "cross-site" ||
          (origin && new URL(origin).host !== expectedHost)) {
        res.status(403).json({ error: "Use the site directly to make changes." });
        return;
      }
    }
    res.setHeader("Cache-Control", "no-store");
    next();
  } catch {
    req.log.error("Unable to verify team owner access");
    res.status(503).json({ error: "Owner access could not be verified. Please try again." });
  }
};
