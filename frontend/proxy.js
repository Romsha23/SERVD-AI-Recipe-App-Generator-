import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import arcjet, { shield, detectBot } from "@arcjet/next";

const isProtectedRoute = createRouteMatcher([
  "/recipe(.*)",
  "/recipes(.*)",
  "/pantry(.*)",
  "/dashboard(.*)",
]);

// Arcjet global protection
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield WAF - protects against SQL injection, XSS, etc.
    shield({
      mode: "LIVE", // Change to "DRY_RUN" to test without blocking
    }),

    // Bot detection - allow search engines, block malicious bots
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
        "CATEGORY:PREVIEW", // Link previews (Slack, Discord, etc.)
      ],
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  // Apply Arcjet protection FIRST (if ARCJET_KEY is provided)
  if (process.env.ARCJET_KEY && process.env.ARCJET_KEY !== "your_arcjet_api_key_here") {
    try {
      const decision = await aj.protect(req);
      if (decision.isDenied()) {
        return NextResponse.json({ error: "Forbidden by Arcjet security" }, { status: 403 });
      }
    } catch (arcjetErr) {
      console.warn("Arcjet middleware protection skipped/error:", arcjetErr?.message);
    }
  }

  // Then apply Clerk authentication
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
