import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { 
  Mountain, 
  Zap, 
  Users, 
  Award, 
  Heart,
  Target,
  Lightbulb,
  Shield
} from "lucide-react";
import { useRef } from "react";

export default function About() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const values = [
    {
      icon: Mountain,
      title: "Adventure First",
      description: "We believe life's greatest moments happen off the beaten path. Every scooter is engineered to take you there.",
    },
    {
      icon: Zap,
      title: "Relentless Innovation",
      description: "Pushing boundaries with cutting-edge technology and performance that redefines what's possible.",
    },
    {
      icon: Shield,
      title: "Built to Last",
      description: "Military-grade materials and rigorous testing ensure your Elk scooter conquers any terrain for years to come.",
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Our riders aren't customers—they're family. Every design decision starts with your feedback.",
    },
  ];

  const milestones = [
    { year: "2019", title: "The Beginning", description: "Founded with a vision to revolutionize urban mobility" },
    { year: "2020", title: "First Launch", description: "Elk Rover debuts, selling out in 48 hours" },
    { year: "2022", title: "Going Off-Road", description: "Introduced all-terrain capabilities with the Patriot series" },
    { year: "2024", title: "1,000+ Riders", description: "Joined by thousands of adventurers worldwide" },
  ];

  const team = [
    {
      name: "Marcus Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Former Tesla engineer with a passion for sustainable adventure",
    },
    {
      name: "Sarah Mitchell",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Award-winning industrial designer from BMW Motorrad",
    },
    {
      name: "David Park",
      role: "Chief Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "20+ years developing high-performance electric vehicles",
    },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 container mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              BUILT FOR THE{" "}
              <span className="text-amber-500">BOLD</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              We're not just building scooters. We're engineering freedom, one ride at a time.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Target className="h-16 w-16 text-amber-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-6">
              To empower adventurers with premium electric scooters that combine raw power, 
              uncompromising quality, and sustainable innovation.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Every Elk scooter is a statement—a commitment to pushing limits, exploring the unknown, 
              and riding beyond what others think is possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              WHAT DRIVES <span className="text-amber-500">US</span>
            </h2>
            <p className="text-xl text-zinc-400">The principles that guide every decision we make</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-all group"
              >
                <value.icon className="h-12 w-12 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
                  {value.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
            alt="Background"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              OUR <span className="text-amber-500">JOURNEY</span>
            </h2>
            <p className="text-xl text-zinc-400">From garage startup to industry leader</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-8 pb-12 border-l-2 border-amber-500/30 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-amber-500 rounded-full -translate-x-[9px]" />
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-all">
                  <div className="text-3xl font-bold text-amber-500 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-zinc-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Operations Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              READY TO <span className="text-amber-500">SHIP</span>
            </h2>
            <p className="text-xl text-zinc-400">Delivering adventure to riders nationwide</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/30 group">
              <img
                src="https://harmless-tapir-303.convex.cloud/api/storage/8b199b2a-a786-443b-8a55-fbf86740620c"
                alt="Shipping container filled with Elk Scooters"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Every Scooter, Carefully Packed
                </p>
                <p className="text-lg text-zinc-300">
                  From our facility to your driveway—quality you can trust
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
            <Award className="h-16 w-16 text-amber-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              JOIN THE <span className="text-amber-500">ADVENTURE</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-12">
              Become part of a community that refuses to settle for ordinary.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/scooters")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg px-12 py-6 rounded-full"
            >
              Explore Our Scooters
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-amber-500/20 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© 2025 Elk Scooters. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}