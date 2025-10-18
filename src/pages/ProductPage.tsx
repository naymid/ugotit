import { useParams, useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import {
  ArrowLeft,
  Zap,
  Battery,
  Gauge,
  Star,
  Shield,
  Truck,
  Headphones,
} from "lucide-react";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scooters = useQuery(api.scooters.getAllScooters);
  
  const scooter = scooters?.find((s) => s.id === id);

  if (!scooters) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!scooter) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Scooter Not Found</h1>
          <Button onClick={() => navigate("/scooters")} className="bg-amber-500 hover:bg-amber-600 text-black">
            Back to All Scooters
          </Button>
        </div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800">
              <img
                src={scooter.image}
                alt={scooter.name}
                className="w-full h-auto object-contain"
              />
              {!scooter.inStock && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <Badge variant="destructive" className="text-2xl px-6 py-3">
                    SOLD OUT
                  </Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {scooter.badges.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-amber-500/20 text-amber-500 border-amber-500/30"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{scooter.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(scooter.rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-400">
                {scooter.rating} ({scooter.reviews} reviews)
              </span>
            </div>

            <div className="mb-8">
              {scooter.originalPrice && (
                <span className="text-2xl text-zinc-500 line-through mr-4">
                  ${scooter.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-5xl font-bold text-amber-500">
                ${scooter.price.toFixed(2)}
              </span>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Zap className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Power</div>
                <div className="text-xl font-bold">{scooter.power}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Gauge className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Max Speed</div>
                <div className="text-xl font-bold">{scooter.maxSpeed}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Battery className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Max Range</div>
                <div className="text-xl font-bold">{scooter.range}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Star className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Wheels</div>
                <div className="text-xl font-bold">{scooter.wheels}</div>
              </div>
            </div>

            <Button
              size="lg"
              disabled={!scooter.inStock}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-6 rounded-full mb-4"
            >
              {scooter.inStock ? "Add to Cart" : "Out of Stock"}
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
      </div>
    </div>
  );
}
