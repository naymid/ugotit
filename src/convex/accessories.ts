import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllAccessories = query({
  args: {},
  handler: async () => {
    return [
      {
        id: "extra-battery",
        name: "Extra Battery",
        type: "accessory",
        category: "battery",
        badges: ["Accessory", "Extended Range"],
        image: "https://harmless-tapir-303.convex.cloud/api/storage/a49e5edf-07cd-4477-8cbb-b2d21a842f05",
        rating: 4.9,
        reviews: 89,
        inStock: true,
        description: "High-capacity replacement battery for extended range and backup power.",
        variants: [
          {
            scooterGroup: "group-a",
            scooterModels: ["Cruiser", "Rover", "Velocity"],
            power: "60V 20Ah",
            price: 399.99,
            sku: "BAT-A-20",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/a49e5edf-07cd-4477-8cbb-b2d21a842f05",
          },
          {
            scooterGroup: "group-a",
            scooterModels: ["Cruiser", "Rover", "Velocity"],
            power: "60V 25Ah",
            price: 499.99,
            sku: "BAT-A-25",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/a49e5edf-07cd-4477-8cbb-b2d21a842f05",
          },
          {
            scooterGroup: "group-b",
            scooterModels: ["Jubilee", "Jubilee X", "Patriot"],
            power: "60V 20Ah",
            price: 449.99,
            sku: "BAT-B-20",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/1c379d19-09ff-4110-a2ad-7cfeae12e4da",
          },
          {
            scooterGroup: "group-b",
            scooterModels: ["Jubilee", "Jubilee X", "Patriot"],
            power: "60V 25Ah",
            price: 549.99,
            sku: "BAT-B-25",
            image: "https://harmless-tapir-303.convex.cloud/api/storage/1c379d19-09ff-4110-a2ad-7cfeae12e4da",
          },
        ],
      },
    ];
  },
});
