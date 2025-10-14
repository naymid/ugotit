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
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
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
          },
          {
            scooterGroup: "group-a",
            scooterModels: ["Cruiser", "Rover", "Velocity"],
            power: "60V 25Ah",
            price: 499.99,
            sku: "BAT-A-25",
          },
          {
            scooterGroup: "group-b",
            scooterModels: ["Jubilee", "Jubilee X", "Patriot"],
            power: "60V 20Ah",
            price: 449.99,
            sku: "BAT-B-20",
          },
          {
            scooterGroup: "group-b",
            scooterModels: ["Jubilee", "Jubilee X", "Patriot"],
            power: "60V 25Ah",
            price: 549.99,
            sku: "BAT-B-25",
          },
        ],
      },
    ];
  },
});
