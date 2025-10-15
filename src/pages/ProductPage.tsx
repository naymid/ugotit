import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ScooterQuiz } from "@/components/ScooterQuiz";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useNavigate } from "react-router";
import {
  Zap,
  Mountain,
  Battery,
  Gauge,
  Star,
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  Check,
  ChevronLeft,
  Wrench,
  Award,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const scooters = useQuery(api.scooters.getAllScooters);
  
  const scooter = scooters?.find((s) => s.id === id);

  useEffect(() => {
    if (scooters && !scooter) {
      navigate("/scooters");
    }
  }, [scooters, scooter, navigate]);

  if (!scooter) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!scooter.inStock) {
      toast.error("This scooter is currently sold out");
      return;
    }
    toast.success(`${scooter.name} added to cart!`, {
      description: `Price: $${scooter.price.toFixed(2)}`,
    });
  };

  // Product images - main image plus additional images if available (handle union typing)
  const gallery: string[] | undefined = (scooter as any).additionalImages;
  const productImages = Array.isArray(gallery) && gallery.length > 0
    ? [scooter.image, ...gallery]
    : [scooter.image, scooter.image, scooter.image, scooter.image];

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
            Back to All Scooters
          </Button>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 mb-4 overflow-hidden shadow-2xl"
              >
                {!scooter.inStock && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
                    <Badge variant="destructive" className="text-2xl px-6 py-3">
                      SOLD OUT
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />
                <img
                  src={productImages[selectedImage]}
                  alt={scooter.name}
                  className="w-full h-96 object-contain relative z-10 drop-shadow-2xl"
                />
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border rounded-2xl p-4 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all overflow-hidden group ${
                      selectedImage === idx ? "border-amber-500 shadow-lg shadow-amber-500/20" : "border-zinc-800/50"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={img}
                      alt={`${scooter.name} view ${idx + 1}`}
                      className="w-full h-20 object-contain relative z-10 drop-shadow-lg"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {scooter.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-sm px-3 py-1"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              <h1 className="text-5xl font-bold tracking-tighter mb-4">
                {scooter.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
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
                  <span className="text-zinc-500 line-through text-2xl mr-3">
                    ${scooter.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-5xl font-bold text-amber-500">
                  ${scooter.price.toFixed(2)}
                </span>
              </div>

              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                Experience the ultimate in electric scooter performance with the {scooter.name}. 
                Engineered for {scooter.wheels === 2 ? "agile maneuverability" : "stable power"} and 
                built to conquer any terrain with its {scooter.tire.toLowerCase()} tires.
              </p>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Power</p>
                      <p className="text-xl font-bold">{scooter.power}</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                  <div className="flex items-center gap-3">
                    <Gauge className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Max Speed</p>
                      <p className="text-xl font-bold">{scooter.maxSpeed}</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                  <div className="flex items-center gap-3">
                    <Battery className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Max Range</p>
                      <p className="text-xl font-bold">{scooter.range}</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                  <div className="flex items-center gap-3">
                    <Mountain className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Wheels</p>
                      <p className="text-xl font-bold">{scooter.wheels} Wheels</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!scooter.inStock}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-6"
                >
                  {scooter.inStock ? "Add to Cart" : "Sold Out"}
                  {scooter.inStock && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setQuizOpen(true)}
                  className="border-2 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 font-bold text-lg py-6"
                >
                  Find My Model
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

      {/* Detailed Specs */}
      <DetailedSpecs scooter={scooter} />

      {/* Features Section */}
      <FeaturesSection scooter={scooter} />

      {/* Image Placeholders Section */}
      <ImagePlaceholdersSection />

      {/* Customer Photos Section */}
      <CustomerPhotosSection />

      {/* Related Products */}
      <RelatedProducts currentScooterId={scooter.id} />

      {/* Footer */}
      <Footer />

      {/* Quiz Modal */}
      <ScooterQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}

function DetailedSpecs({ scooter }: { scooter: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const specs = [
    { label: "Motor Power", value: scooter.power },
    { label: "Top Speed", value: scooter.maxSpeed },
    { label: "Range", value: scooter.range },
    { label: "Tire Type", value: scooter.tire },
    { label: "Wheel Configuration", value: `${scooter.wheels} Wheels` },
    { label: "Weight Capacity", value: "330 lbs" },
    { label: "Charge Time", value: "3-4 hours" },
    { label: "Braking System", value: "Dual Disc Brakes" },
    { label: "Suspension", value: "Front & Rear" },
    { label: "Display", value: "LCD Smart Display" },
    { label: "Lighting", value: "LED Front & Rear" },
    { label: "Water Resistance", value: "IP54 Rated" },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            TECHNICAL SPECIFICATIONS
          </h2>
          <p className="text-xl text-zinc-400">Engineering excellence in every detail</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {specs.map((spec, idx) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.05 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-all"
            >
              <p className="text-zinc-400 text-sm mb-2">{spec.label}</p>
              <p className="text-2xl font-bold text-white">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ scooter }: { scooter: any }) {
  const features = [
    {
      icon: Zap,
      title: "Powerful Motor",
      description: `${scooter.power} motor delivers incredible acceleration and hill-climbing capability.`,
    },
    {
      icon: Battery,
      title: "Long Range Battery",
      description: `Travel up to ${scooter.range} on a single charge with our advanced battery technology.`,
    },
    {
      icon: Shield,
      title: "Durable Construction",
      description: "Aircraft-grade aluminum frame built to withstand the toughest conditions.",
    },
    {
      icon: Gauge,
      title: "Smart Display",
      description: "LCD display shows speed, battery, distance, and riding mode at a glance.",
    },
    {
      icon: Wrench,
      title: "Easy Maintenance",
      description: "Modular design allows for simple self-service and quick part replacements.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Backed by our 1-year warranty and rated 4.9★ by thousands of riders.",
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            PREMIUM FEATURES
          </h2>
          <p className="text-xl text-zinc-400">Built for performance and reliability</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:border-amber-500/50 transition-all group"
            >
              <feature.icon className="h-12 w-12 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImagePlaceholdersSection() {
  const placeholders = [
    { 
      title: "Precision Engineered Suspension", 
      description: "Premium shock absorption meets precision braking—built to handle any terrain with confidence",
      image: "https://harmless-tapir-303.convex.cloud/api/storage/afd3f918-2e53-4d73-bf24-61edc025c3be"
    },
    { 
      title: "Performance Braking System", 
      description: "Race-grade disc brakes with signature red calipers deliver instant stopping power when you need it most",
      image: "https://harmless-tapir-303.convex.cloud/api/storage/bffa5a11-66da-4121-a27a-f0fbcf7659ae"
    },
    { 
      title: "Built for Adventure", 
      description: "Experience the thrill of off-road freedom" 
    },
    { 
      title: "Your Daily Ride, Elevated", 
      description: "Transform every commute into an adventure" 
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            SEE IT IN ACTION
          </h2>
          <p className="text-xl text-zinc-400">More images coming soon</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {placeholders.map((placeholder, idx) => (
            <motion.div
              key={placeholder.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden h-80 group hover:border-amber-500/50 transition-all"
            >
              {(placeholder as any).image ? (
                <>
                  <img
                    src={(placeholder as any).image}
                    alt={placeholder.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {placeholder.title}
                      </h3>
                      <p className="text-zinc-300">{placeholder.description}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="text-center">
                    <Mountain className="h-16 w-16 text-amber-500/30 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-zinc-600 mb-2">
                      {placeholder.title}
                    </h3>
                    <p className="text-zinc-500">{placeholder.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerPhotosSection() {
  const customerPhotos = [
    {
      image: "https://harmless-tapir-303.convex.cloud/api/storage/ec62f0aa-0684-4992-89c2-51fd0fb9f3ef",
      author: "Marcus T.",
      location: "Colorado Rockies",
      caption: "Took it up to the mountain trails - handles like a dream!"
    },
    {
      image: "https://harmless-tapir-303.convex.cloud/api/storage/6ade2d48-0901-4239-a99a-61e49723070d",
      author: "David K.",
      location: "Malibu, CA",
      caption: "Beach cruising has never been this fun"
    },
    {
      image: "https://harmless-tapir-303.convex.cloud/api/storage/ccc61561-572a-46a8-a02d-4921aff44d16",
      author: "Sarah L.",
      location: "Portland, OR",
      caption: "Perfect for my daily commute and weekend adventures"
    },
    {
      image: "https://harmless-tapir-303.convex.cloud/api/storage/0088d438-14e9-4fa5-b2f4-2084e6bd8c17",
      author: "Ryan S.",
      location: "Dolomites, Italy",
      caption: "Exploring the mountain roads - this thing is a beast"
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            REAL RIDERS, REAL ADVENTURES
          </h2>
          <p className="text-xl text-zinc-400">See how riders are enjoying their Elk scooters</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer"
            >
              <div className="aspect-[9/16] relative overflow-hidden">
                <img
                  src={photo.image}
                  alt={`Customer photo by ${photo.author}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium mb-1">{photo.author}</p>
                <p className="text-zinc-400 text-sm mb-2">{photo.location}</p>
                <p className="text-zinc-300 text-sm italic">"{photo.caption}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-zinc-400 mb-4">Share your adventure with #ElkScooters</p>
          <Button
            variant="outline"
            className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
          >
            Upload Your Photo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedProducts({ currentScooterId }: { currentScooterId: string }) {
  const navigate = useNavigate();
  const scooters = useQuery(api.scooters.getAllScooters);
  const relatedScooters = scooters?.filter((s) => s.id !== currentScooterId).slice(0, 3);

  if (!relatedScooters || relatedScooters.length === 0) return null;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            YOU MIGHT ALSO LIKE
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedScooters.map((scooter, idx) => (
            <motion.div
              key={scooter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(`/scooter/${scooter.id}`)}
              className="cursor-pointer group"
            >
              <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all">
                <div className="p-6">
                  <img
                    src={scooter.image}
                    alt={scooter.name}
                    className="w-full h-48 object-contain mb-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                    {scooter.name}
                  </h3>
                  <p className="text-2xl font-bold text-amber-500 mb-4">
                    ${scooter.price.toFixed(2)}
                  </p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-amber-500/20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold">ELK SCOOTERS</span>
            </div>
            <p className="text-zinc-400 text-sm">
              Electrifying the path less traveled.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Two Wheels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Three Wheels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2025 Elk Scooters. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
