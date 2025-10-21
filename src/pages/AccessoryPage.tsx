import { useParams, useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import {
  ArrowLeft,
  Star,
  Shield,
  Truck,
  Headphones,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AccessoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const accessories = useQuery(api.accessories.getAllAccessories);
  const [selectedVariant, setSelectedVariant] = useState(0);
  
  const accessory = accessories?.find((a) => a.id === id);

  if (!accessories) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Accessory Not Found</h1>
          <Button onClick={() => navigate("/scooters")} className="bg-amber-500 hover:bg-amber-600 text-black">
            Back to All Scooters
          </Button>
        </div>
      </div>
    );
  }

  const currentVariant = accessory.variants?.[selectedVariant];
  const currentImage = currentVariant?.image || accessory.image;
  const currentPrice = currentVariant?.price || 0;

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${accessory.name} - ${currentVariant?.power || ""}`,
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-amber-500 hover:text-amber-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 rounded-2xl p-8 border border-zinc-800">
              <img
                src={currentImage}
                alt={accessory.name}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {accessory.badges?.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-amber-500/20 text-amber-500 border-amber-500/30"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{accessory.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(accessory.rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-400">
                {accessory.rating} ({accessory.reviews} reviews)
              </span>
            </div>

            <p className="text-zinc-400 mb-8">{accessory.description}</p>

            {/* Variant Selector */}
            {accessory.variants && accessory.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Select Compatibility</h3>
                <div className="grid gap-3">
                  {accessory.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedVariant === idx
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white mb-1">
                            {variant.scooterGroup === "2-wheel" ? "2-Wheel" : "3-Wheel"} - {variant.power}
                          </div>
                          <div className="text-sm text-zinc-400">
                            {variant.scooterGroup === "2-wheel" ? "2-Wheel Scooters" : "3-Wheel Scooters"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-amber-500">
                            ${variant.price.toFixed(2)}
                          </div>
                          {selectedVariant === idx && (
                            <Check className="h-5 w-5 text-amber-500 ml-auto mt-1" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <span className="text-5xl font-bold text-amber-500">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-6 rounded-full mb-4"
            >
              Buy Now
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-800">
              <div className="text-center">
                <Truck className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-400">Free Shipping</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-400">1-Year Warranty</div>
              </div>
              <div className="text-center">
                <Headphones className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-400">US Support</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compatible Models */}
        {currentVariant && (
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-8"
            >
              COMPATIBLE WITH
            </motion.h2>
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {currentVariant.scooterModels.map((model) => (
                  <Badge
                    key={model}
                    variant="secondary"
                    className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-sm px-4 py-2"
                  >
                    {model.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </Badge>
                ))}
              </div>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
