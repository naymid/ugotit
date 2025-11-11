import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { ScooterQuiz } from "@/components/ScooterQuiz";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Play,
  ChevronDown,
  Truck,
  Shield,
  Star,
  Headphones,
  CreditCard,
  Zap,
  Mountain,
  Battery,
  Gauge,
  Wrench,
  Award,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const scooters = useQuery(api.scooters.getAllScooters);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const featuredScooters = scooters?.filter((s) =>
    ["elk-cruiser", "elk-thunderbolt", "elk-jubilee-x", "elk-patriot"].includes(s.id)
  ).sort((a, b) => {
    // Sort sold out items to the end
    if (a.inStock === b.inStock) return 0;
    return a.inStock ? -1 : 1;
  });

  const scrollToSection = (id: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const displayedScooters = selectedCategory 
    ? scooters?.filter(s => s.wheels === selectedCategory)
    : featuredScooters;

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar onNavigate={scrollToSection} onQuizOpen={() => setQuizOpen(true)} />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')] bg-cover bg-center opacity-20" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
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

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 container mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 px-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 sm:mb-6">
              RIDE{" "}
              <motion.span
                className="text-amber-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                BEYOND LIMITS
              </motion.span>
              .
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed px-4">
              Premium all-terrain electric scooters engineered for freedom, power, and precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
          >
            <Button
              size="lg"
              onClick={() => navigate("/scooters")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg shadow-amber-500/50 w-full sm:w-auto"
            >
              Find Your Scooter
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://youtu.be/r5FKsGhGx28", "_blank")}
              className="border-2 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full w-full sm:w-auto"
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Watch in Action
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="relative px-4"
          >
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/e11dfd25-daaf-488e-9070-5a5fc7ca7a3d"
              alt="Elk Cruiser"
              className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <ChevronDown className="h-8 w-8 mx-auto text-amber-500 animate-bounce" />
            <p className="text-sm text-zinc-500 mt-2">Start Your Adventure</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-6 sm:py-8 border-y border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {[
              { icon: Truck, label: "Free Shipping" },
              { icon: Shield, label: "1-Year Warranty" },
              { icon: Star, label: "4.9★ Reviews" },
              { icon: Headphones, label: "US-Based Support" },
              { icon: CreditCard, label: "Secure Checkout" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <item.icon className="h-6 w-6 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Black Friday Sale Banner */}
      <section className="py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black font-bold text-sm sm:text-base md:text-lg">
            🛍️ BLACK FRIDAY SALE — Save $250 With Code <span className="bg-black text-amber-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm md:text-base">BLACKFRIDAY</span>
          </p>
        </div>
      </section>

      {/* Featured Scooters */}
      <section id="scooters" className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-3 sm:mb-4">
              {selectedCategory ? `${selectedCategory}-WHEEL SCOOTERS` : "FEATURED SCOOTERS"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400">Engineered for dominance</p>
            {selectedCategory && (
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="mt-4 border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
              >
                View All Scooters
              </Button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {displayedScooters?.map((scooter, idx) => (
              <ScooterCard key={scooter.id} scooter={scooter} index={idx} onViewDetails={scrollToSection} />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Showcase */}
      <PerformanceSection />

      {/* Why Elk Section */}
      <WhyElkSection />

      {/* Category Explorer */}
      <CategorySection onCategorySelect={setSelectedCategory} onNavigate={scrollToSection} />

      {/* CTA Section */}
      <CTASection onQuizOpen={() => setQuizOpen(true)} onNavigate={scrollToSection} />

      {/* Footer */}
      <Footer />

      {/* Quiz Modal */}
      <ScooterQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}

function ScooterCard({ scooter, index, onViewDetails }: { scooter: any; index: number; onViewDetails: (id: string) => void }) {
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
            <Badge variant="destructive" className="text-lg px-4 py-2">SOLD OUT</Badge>
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
              <Badge key={badge} className="bg-amber-500/20 text-amber-500 border-amber-500/30">
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

function PerformanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "0–15 MPH Acceleration", value: 3.2, unit: "s" },
    { label: "Max Range", value: 30, unit: "miles" },
    { label: "Motor Output", value: 6000, unit: "W", prefix: "Up to " },
    { label: "Peak Gradeability", value: 40, unit: "%" },
    { label: "Weight Capacity", value: 330, unit: "lbs" },
    { label: "Charge Time", value: 3, unit: "h", prefix: "<" },
  ];

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-3 sm:mb-4">
              PERFORMANCE UNLEASHED
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400">Engineering excellence in every metric</p>
          </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-xl group hover:border-amber-500/50 transition-all"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-500 mb-1 sm:mb-2"
                >
                  {stat.prefix}{stat.value}{stat.unit}
                </motion.div>
                <p className="text-zinc-400 font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
              </div>
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyElkSection() {
  const features = [
    { icon: Zap, label: "Powerful Motors", description: "Unmatched acceleration" },
    { icon: Shield, label: "Aircraft Grade Frame", description: "Military-spec durability" },
    { icon: Mountain, label: "All-Terrain Tires", description: "Conquer any surface" },
    { icon: Battery, label: "Fast Charge Tech", description: "Back on road faster" },
    { icon: Gauge, label: "Smart Controls", description: "Precision at your fingertips" },
    { icon: Wrench, label: "Modular Maintenance", description: "Easy self-service" },
    { icon: Star, label: "4.9★ Trusted Rating", description: "Thousands of riders" },
    { icon: Truck, label: "Free Nationwide Shipping", description: "Delivered to your door" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
          alt="Mountains"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            BUILT TO DOMINATE EVERY TERRAIN
          </h2>
          <p className="text-xl text-zinc-400">Why thousands choose Elk</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-amber-500/50 transition-all group"
            >
              <feature.icon className="h-12 w-12 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2 group-hover:text-amber-500 transition-colors">
                {feature.label}
              </h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategorySection({ onCategorySelect, onNavigate }: { onCategorySelect: (wheels: number) => void; onNavigate: (id: string) => void }) {
  const navigate = useNavigate();
  
  const categories = [
    {
      title: "Two Wheels",
      subtitle: "Agile Performance",
      count: "4 Models",
      wheels: 2,
      image: "https://harmless-tapir-303.convex.cloud/api/storage/7effa899-7bab-4f0c-9bc2-ad79713126bd",
    },
    {
      title: "Three Wheels",
      subtitle: "Stable Power",
      count: "3 Models",
      wheels: 3,
      image: "https://harmless-tapir-303.convex.cloud/api/storage/90c56e58-647e-430d-980a-a15415c694db",
    },
    {
      title: "Accessories",
      subtitle: "Upgrade Your Ride",
      count: "Batteries & More",
      wheels: null,
      image: "https://harmless-tapir-303.convex.cloud/api/storage/775163ad-3508-47a0-a108-2ee23fc0d821",
      isAccessories: true,
    },
  ];

  const handleCategoryClick = (wheels: number | null, isAccessories?: boolean) => {
    if (isAccessories) {
      navigate("/scooters");
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const element = document.getElementById("accessories");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 100);
    } else if (wheels) {
      onCategorySelect(wheels);
      onNavigate("scooters");
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            CHOOSE YOUR PATH
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleCategoryClick(category.wheels, category.isAccessories)}
              className="group relative overflow-hidden rounded-2xl h-64 sm:h-80 md:h-96 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                  {category.title}
                </h3>
                <p className="text-zinc-300 mb-1">{category.subtitle}</p>
                <p className="text-sm text-amber-500 font-medium">{category.count}</p>
                <ArrowRight className="h-6 w-6 text-amber-500 mt-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onQuizOpen, onNavigate }: { onQuizOpen: () => void; onNavigate: (id: string) => void }) {
  const navigate = useNavigate();
  
  return (
    <section className="py-32 relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-4 sm:mb-6 px-4">
            YOUR ADVENTURE STARTS NOW
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Join thousands of Elk riders. Free shipping, 1-year warranty, and expert support on every scooter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button
              size="lg"
              onClick={() => navigate("/scooters")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-6 rounded-full w-full sm:w-auto"
            >
              Shop All Scooters
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onQuizOpen}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-6 rounded-full w-full sm:w-auto"
            >
              Find My Model
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
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
              <li><button onClick={() => navigate("/scooters?wheels=2")} className="hover:text-amber-500 transition-colors text-left">Two Wheels</button></li>
              <li><button onClick={() => navigate("/scooters?wheels=3")} className="hover:text-amber-500 transition-colors text-left">Three Wheels</button></li>
              <li><button onClick={() => navigate("/scooters")} className="hover:text-amber-500 transition-colors text-left">Accessories</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => navigate("/contact")} className="hover:text-amber-500 transition-colors text-left">Contact Us</button></li>
              <li><button onClick={() => navigate("/warranty")} className="hover:text-amber-500 transition-colors text-left">Warranty</button></li>
              <li><button onClick={() => navigate("/shipping")} className="hover:text-amber-500 transition-colors text-left">Shipping</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => navigate("/about")} className="hover:text-amber-500 transition-colors text-left">About</button></li>
              <li><button onClick={() => navigate("/blog")} className="hover:text-amber-500 transition-colors text-left">Blog</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2025 Elk Scooters. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/privacy")} className="hover:text-amber-500 transition-colors">Privacy Policy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-amber-500 transition-colors">Terms</button>
            <button onClick={() => navigate("/cookies")} className="hover:text-amber-500 transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}