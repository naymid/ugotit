import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ScooterQuiz } from "@/components/ScooterQuiz";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useNavigate } from "react-router";
import {
  Battery,
  Star,
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  Zap,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AccessoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedPower, setSelectedPower] = useState<string>("");
  const accessories = useQuery(api.accessories.getAllAccessories);
  
  const accessory = accessories?.find((a) => a.id === id);

  useEffect(() => {
    if (accessories && !accessory) {
      navigate("/scooters");
    }
  }, [accessories, accessory, navigate]);

  if (!accessory) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const selectedVariant = accessory.variants?.find(
    (v) => v.scooterGroup === selectedGroup && v.power === selectedPower
  );

  const currentPrice = selectedVariant?.price || accessory.variants?.[0]?.price || 0;
  const currentImage = selectedVariant?.image || accessory.image;

  const handleAddToCart = () => {
    if (!selectedGroup || !selectedPower) {
      toast.error("Please select all options");
      return;
    }
    if (!accessory.inStock) {
      toast.error("This accessory is currently sold out");
      return;
    }
    toast.success(`${accessory.name} added to cart!`, {
      description: `Configuration: ${selectedVariant?.scooterModels.join(", ")} - ${selectedPower} | Price: $${currentPrice.toFixed(2)}`,
    });
  };

  const groupAModels = accessory.variants?.find((v) => v.scooterGroup === "group-a")?.scooterModels || [];
  const groupBModels = accessory.variants?.find((v) => v.scooterGroup === "group-b")?.scooterModels || [];
  const powerOptions = [...new Set(accessory.variants?.map((v) => v.power))];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar onQuizOpen={() => setQuizOpen(true)} />

      {/* Back Button */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/scooters")}
            className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to All Products
          </Button>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8"
              >
                <img
                  src={currentImage}
                  alt={accessory.name}
                  className="w-full h-96 object-contain"
                />
              </motion.div>
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {accessory.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-sm px-3 py-1"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              <h1 className="text-5xl font-bold tracking-tighter mb-4">
                {accessory.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
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

              <div className="mb-8">
                <span className="text-5xl font-bold text-amber-500">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                {accessory.description}
              </p>

              {/* Variant Selectors */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-3 text-zinc-300">
                    Scooter Compatibility *
                  </label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger className="w-full bg-zinc-900/50 border-zinc-800 text-white">
                      <SelectValue placeholder="Select compatible scooter models" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group-a">
                        {groupAModels.join(", ")}
                      </SelectItem>
                      <SelectItem value="group-b">
                        {groupBModels.join(", ")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-zinc-300">
                    Power Capacity *
                  </label>
                  <Select value={selectedPower} onValueChange={setSelectedPower}>
                    <SelectTrigger className="w-full bg-zinc-900/50 border-zinc-800 text-white">
                      <SelectValue placeholder="Select power capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      {powerOptions.map((power) => (
                        <SelectItem key={power} value={power}>
                          {power}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedVariant && (
                  <Card className="bg-amber-500/10 border-amber-500/30 p-4">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-500 mb-1">
                          Configuration Selected
                        </p>
                        <p className="text-sm text-zinc-300">
                          Compatible with: {selectedVariant.scooterModels.join(", ")}
                        </p>
                        <p className="text-sm text-zinc-300">
                          Capacity: {selectedVariant.power}
                        </p>
                        <p className="text-sm text-zinc-400 mt-1">
                          SKU: {selectedVariant.sku}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!accessory.inStock || !selectedGroup || !selectedPower}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-6"
                >
                  {accessory.inStock ? "Add to Cart" : "Sold Out"}
                  {accessory.inStock && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">1-Year Warranty</p>
                </div>
                <div className="text-center">
                  <Headphones className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">US Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              PREMIUM BATTERY FEATURES
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Battery,
                title: "Extended Range",
                description: "Double your riding distance with a spare battery",
              },
              {
                icon: Zap,
                title: "Fast Charging",
                description: "Full charge in 3-4 hours with smart charging",
              },
              {
                icon: Shield,
                title: "Built to Last",
                description: "Premium cells with 1000+ charge cycles",
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:border-amber-500/50 transition-all"
              >
                <feature.icon className="h-12 w-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-amber-500/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-zinc-500 text-sm">
            © 2025 Elk Scooters. All rights reserved.
          </div>
        </div>
      </footer>

      <ScooterQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
