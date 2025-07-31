import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";

const http = httpRouter();
http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webHookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await request.text();

    const wh = new Webhook(webHookSecret);
    let event: WebhookEvent;

    try {
      event = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying hooks", err);
      return new Response("Error occured", { status: 400 });
    }

    const eventType = event.type;
    if (eventType === "user.created") {
      // save the user to db
      const { id, email_addresses, first_name, last_name } = event.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        // save user to db
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (err) {
        console.error("Error creating the user", err);
        return new Response("Error occured while creating user", {
          status: 500,
        });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
