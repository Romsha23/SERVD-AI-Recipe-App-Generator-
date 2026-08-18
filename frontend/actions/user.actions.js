"use server";

import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";

const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
).replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function upgradeUserToPro() {
  try {
    const user = await checkUser();
    if (!user) {
      return {
        success: false,
        error: "User session unhydrated. Please refresh the page (Ctrl + Shift + R) and try again.",
      };
    }

    const res = await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ subscriptionTier: "pro" }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ Failed to update subscription tier:", errText);
      return {
        success: false,
        error: "Failed to update subscription tier in database",
      };
    }

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/pantry");
    revalidatePath("/recipes");

    return { success: true };
  } catch (error) {
    console.error("❌ Error in upgradeUserToPro:", error);
    return { success: false, error: error.message || "Failed to upgrade subscription" };
  }
}
