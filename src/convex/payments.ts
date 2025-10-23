import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPaymentIntent = mutation({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const paymentId = await ctx.db.insert("payments", {
      status: args.status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return paymentId;
  },
});

export const fulfillOrder = mutation({
  args: {
    paymentId: v.id("payments"),
    stripeSessionId: v.string(),
    customerEmail: v.string(),
    amountTotal: v.number(),
    currency: v.string(),
    lineItems: v.optional(v.array(v.any())),
  },
  handler: async (ctx, args) => {
    const { paymentId, stripeSessionId, customerEmail, amountTotal, currency, lineItems } = args;

    const existingPayment = await ctx.db.get(paymentId);
    if (existingPayment && existingPayment.status === "completed") {
      console.log(`Order ${paymentId} already fulfilled. Skipping.`);
      return;
    }

    await ctx.db.patch(paymentId, {
      status: "completed",
      stripeSessionId,
      customerEmail,
      amountTotal,
      currency,
      fulfilledAt: Date.now(),
      purchasedItems: lineItems,
    });

    console.log(`Order ${paymentId} fulfilled for ${customerEmail}.`);
  },
});

export const getPayment = query({
  args: { paymentId: v.id("payments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.paymentId);
  },
});
