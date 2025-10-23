import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ScooterQuiz } from "@/components/ScooterQuiz";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Zap,
  Mountain,
  Battery,
  Gauge,
  Star,
  ArrowRight,
  Filter,
  Shield,
  Truck,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

export default function AllScooters() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const scooters = useQuery(api.scooters.getAllScooters);
  const accessories = useQuery(api.accessories.getAllAccessories);
  const navigate = useNavigate();

  // Set initial category from URL params
  useEffect(() => {
    const wheelsParam = searchParams.get("wheels");
    if (wheelsParam) {
      const wheels = parseInt(wheelsParam);
      if (wheels === 2 || wheels === 3) {
        setSelectedCategory(wheels);
      }
    }
  }, [searchParams]);

  const displayedScooters = selectedCategory
    ? scooters?.filter((s) => s.wheels === selectedCategory)
    : scooters;

  const displayedAccessories = accessories || [];

  const handleNavigation = (id: string) => {
    if (id === "quiz") {
      setQuizOpen(true);
    } else if (id === "accessories" && typeof document !== 'undefined') {
      const element = document.getElementById("accessories");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar onNavigate={handleNavigation} onQuizOpen={() => setQuizOpen(true)} />

      <ScooterQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')] bg-cover bg-center opacity-20" />

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * 400,
              }}
              animate={{
                y: [null, Math.random() * 400],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 sm:mb-6">
              ALL{" "}
              <motion.span
                className="text-amber-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SCOOTERS
              </motion.span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Explore our complete lineup of premium all-terrain electric scooters
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={
                selectedCategory === null
                  ? "bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  : "border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
              }
            >
              <Filter className="mr-2 h-4 w-4" />
              All Models
            </Button>
            <Button
              variant={selectedCategory === 2 ? "default" : "outline"}
              onClick={() => setSelectedCategory(2)}
              className={
                selectedCategory === 2
                  ? "bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  : "border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
              }
            >
              Two Wheels
            </Button>
            <Button
              variant={selectedCategory === 3 ? "default" : "outline"}
              onClick={() => setSelectedCategory(3)}
              className={
                selectedCategory === 3
                  ? "bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  : "border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
              }
            >
              Three Wheels
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Scooters Grid */}
      <section className="py-16 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {displayedScooters?.map((scooter, idx) => (
              <ScooterCard key={scooter.id} scooter={scooter} index={idx} />
            ))}
          </div>

          {displayedScooters && displayedScooters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-zinc-400 text-lg">No scooters found in this category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Accessories Section */}
      {displayedAccessories.length > 0 && (
        <section id="accessories" className="py-16 bg-gradient-to-b from-black via-zinc-900 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                <span className="text-amber-500">ACCESSORIES</span>
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                Enhance your ride
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {displayedAccessories.map((accessory: any, idx: number) => (
                <AccessoryCard key={accessory.id} accessory={accessory} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
          alt="Adventure"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">
              READY TO RIDE?
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-8">
              Free shipping, 1-year warranty, and expert support on every scooter.
            </p>
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-6 rounded-full"
          >
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        onWarrantyClick={() => setWarrantyOpen(true)}
        onShippingClick={() => setShippingOpen(true)}
      />

      {/* Warranty Dialog */}
      <Dialog open={warrantyOpen} onOpenChange={setWarrantyOpen}>
        <DialogContent className="max-w-2xl border-amber-500/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Shield className="h-6 w-6 text-amber-500" />
              1-Year Warranty
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-base pt-4">
              All Elk Scooters come with a comprehensive 1-year warranty from the date of purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-zinc-300">
            <div>
              <h4 className="font-bold text-white mb-2">What's Covered</h4>
              <p>
                Our warranty covers defects in materials and workmanship under normal use. If any parts become defective through normal use (not damage), we will send replacement parts at no additional cost.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">What's Not Covered</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Damage from accidents, misuse, or abuse</li>
                <li>Normal wear and tear (tires, brake pads, etc.)</li>
                <li>Modifications or unauthorized repairs</li>
                <li>Cosmetic damage that doesn't affect functionality</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">How to Claim</h4>
              <p className="text-sm">
                Contact our support team with your order number and a description of the issue. We'll guide you through the warranty claim process and ship replacement parts as needed.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shipping Dialog */}
      <Dialog open={shippingOpen} onOpenChange={setShippingOpen}>
        <DialogContent className="max-w-2xl border-amber-500/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Truck className="h-6 w-6 text-amber-500" />
              Shipping Information
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-base pt-4">
              Fast and reliable freight shipping to your door.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-zinc-300">
            <div>
              <h4 className="font-bold text-white mb-2">Processing Time</h4>
              <p>
                All scooters are shipped within <span className="text-amber-500 font-semibold">3 business days</span> of order confirmation. You'll receive a tracking number once your order ships.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Shipping Method</h4>
              <p>
                Scooters are shipped via <span className="text-amber-500 font-semibold">freight delivery</span> to ensure safe transport. The freight carrier will contact you to schedule a delivery appointment.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Delivery Address</h4>
              <p>
                Scooters must be shipped to a <span className="text-amber-500 font-semibold">residential address</span>. Please ensure someone is available to receive the delivery during the scheduled time window.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-bold text-amber-500 mb-2">Important Note</h4>
              <p className="text-sm">
                Freight deliveries are curbside only. The driver will not bring the scooter inside your home. Please arrange for assistance if needed, as scooters can be heavy.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ScooterCard({ scooter, index }: { scooter: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300">
        {!scooter.inStock && (
          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              SOLD OUT
            </Badge>
          </div>
        )}

        <div className="p-6">
          <div className="relative mb-6">
            <img
              src={scooter.image}
              alt={scooter.name}
              className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {scooter.badges.map((badge: string) => (
              <Badge
                key={badge}
                className="bg-amber-500/20 text-amber-500 border-amber-500/30"
              >
                {badge}
              </Badge>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
            {scooter.name}
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-400">{scooter.power}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-400">{scooter.maxSpeed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-amber-500" />
              <span className="text-zinc-400">{scooter.range}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-zinc-400">{scooter.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              {scooter.originalPrice && (
                <span className="text-zinc-500 line-through text-sm mr-2">
                  ${scooter.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-amber-500">
                ${scooter.price.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
            disabled={!scooter.inStock}
            onClick={() => navigate(`/scooter/${scooter.id}`)}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function AccessoryCard({ accessory, index }: { accessory: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const priceRange = accessory.variants && accessory.variants.length > 0
    ? (() => {
        const prices = accessory.variants.map((v: any) => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return minPrice === maxPrice
          ? `$${minPrice.toFixed(2)}`
          : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
      })()
    : "$0.00";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300">
        <div className="p-6">
          <div className="relative mb-6">
            <img
              src={accessory.image}
              alt={accessory.name}
              className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {accessory.badges?.map((badge: string) => (
              <Badge
                key={badge}
                className="bg-amber-500/20 text-amber-500 border-amber-500/30"
              >
                {badge}
              </Badge>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
            {accessory.name}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(accessory.rating)
                      ? "text-amber-500 fill-amber-500"
                      : "text-zinc-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-zinc-400 text-sm">
              {accessory.rating} ({accessory.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-amber-500">
              {priceRange}
            </span>
          </div>

          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
            onClick={() => navigate(`/accessory/${accessory.id}`)}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function Footer({ onWarrantyClick, onShippingClick }: { onWarrantyClick: () => void; onShippingClick: () => void }) {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-black border-t border-amber-500/20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/c80a657d-9749-4299-bbe9-63f2324be9a2" 
                alt="Elk Scooters Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-zinc-400 text-sm">
              Electrifying the path less traveled.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button onClick={() => navigate("/scooters?wheels=2")} className="hover:text-amber-500 transition-colors text-left">
                  Two Wheels
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/scooters?wheels=3")} className="hover:text-amber-500 transition-colors text-left">
                  Three Wheels
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/scooters")} className="hover:text-amber-500 transition-colors text-left">
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/warranty")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/shipping")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Shipping
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/blog")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2025 Elk Scooters. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/privacy")} className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate("/terms")} className="hover:text-amber-500 transition-colors">
              Terms
            </button>
            <button onClick={() => navigate("/cookies")} className="hover:text-amber-500 transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}