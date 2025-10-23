"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2024-11-20.acacia" as any,
});

export const createCheckoutSession = action({
  args: {
    lineItems: v.array(
      v.object({
        priceId: v.string(),
        quantity: v.number(),
      })
    ),
    metadata: v.optional(v.any()),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const paymentId = await ctx.runMutation(api.payments.createPaymentIntent, {
      status: "pending",
    });

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: args.lineItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      success_url: `${args.successUrl}?paymentId=${paymentId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: args.cancelUrl,
      metadata: {
        paymentId: paymentId,
        ...args.metadata,
      },
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    };

    try {
      const session = await stripe.checkout.sessions.create(sessionParams);
      if (!session.url) {
        throw new Error("Stripe session URL not found.");
      }
      return session.url;
    } catch (error: any) {
      console.error("Error creating Stripe Checkout Session:", error);
      console.error("Stripe error details:", {
        message: error.message,
        type: error.type,
        code: error.code,
        statusCode: error.statusCode,
        raw: error.raw
      });
      throw new Error(`Failed to create checkout session: ${error.message || 'Unknown error'}`);
    }
  },
});

export const handleWebhook = action({
  args: {
    body: v.string(),
    signature: v.string(),
  },
  handler: async (ctx, args) => {
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        args.body,
        args.signature,
        process.env.STRIPE_WEBHOOKS_SECRET!
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed.", err.message);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout Session Completed:", session);

        const paymentId = session.metadata?.paymentId;

        if (paymentId) {
          await ctx.runMutation(api.payments.fulfillOrder, {
            paymentId: paymentId as any,
            stripeSessionId: session.id,
            customerEmail: session.customer_details?.email || "N/A",
            amountTotal: session.amount_total || 0,
            currency: session.currency || "usd",
            lineItems: [],
          });
        }
        break;
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  },
});