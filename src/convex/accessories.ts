import { query } from "./_generated/server";

export const getAllAccessories = query({
  args: {},
  handler: async () => {
    return [
      {
        id: "extra-battery",
        name: "Extra Battery Pack",
        type: "battery",
        category: "power",
        badges: ["Extended Range"],
        image: "https://harmless-tapir-303.convex.cloud/api/storage/775163ad-3508-47a0-a108-2ee23fc0d821",
        rating: 5.0,
        reviews: 15,
        inStock: true,
        description: "High-capacity lithium battery pack for extended range",
        variants: [
          {
            scooterGroup: "2-wheel",
            scooterModels: ["elk-rover", "elk-velocity", "elk-cruiser", "elk-thunderbolt"],
            power: "60V 20Ah",
            price: 399.99,
            sku: "BAT-2W-60V20",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/8c7e9a11-2b64-4d4c-9ade-d9d95216ed50",
          },
          {
            scooterGroup: "2-wheel",
            scooterModels: ["elk-rover", "elk-velocity", "elk-cruiser", "elk-thunderbolt"],
            power: "60V 25Ah",
            price: 449.99,
            sku: "BAT-2W-60V25",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/8c7e9a11-2b64-4d4c-9ade-d9d95216ed50",
          },
          {
            scooterGroup: "3-wheel",
            scooterModels: ["elk-patriot", "elk-jubilee", "elk-jubilee-x"],
            power: "60V 20Ah",
            price: 499.99,
            sku: "BAT-3W-60V20",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/775163ad-3508-47a0-a108-2ee23fc0d821",
          },
          {
            scooterGroup: "3-wheel",
            scooterModels: ["elk-patriot", "elk-jubilee", "elk-jubilee-x"],
            power: "60V 25Ah",
            price: 549.99,
            sku: "BAT-3W-60V25",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/775163ad-3508-47a0-a108-2ee23fc0d821",
          },
        ],
      },
    ];
  },
});