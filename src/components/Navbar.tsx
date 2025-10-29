import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import { useNavigate } from "react-router";

interface NavbarProps {
  onNavigate?: (id: string) => void;
  onQuizOpen?: () => void;
}

export function Navbar({ onNavigate, onQuizOpen }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "All Scooters", href: "scooters", isRoute: true, category: null },
    { label: "Two Wheels", href: "scooters?wheels=2", isRoute: true, category: 2 },
    { label: "Three Wheels", href: "scooters?wheels=3", isRoute: true, category: 3 },
    { label: "Accessories", href: "accessories" },
    { label: "Find Your Scooter", href: "quiz" },
  ];

  const handleNavClick = (href: string, isRoute?: boolean) => {
    if (href === "quiz") {
      if (onQuizOpen) {
        onQuizOpen();
      }
    } else if (href === "accessories") {
      navigate("/scooters");
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const element = document.getElementById("accessories");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 100);
    } else if (isRoute) {
      navigate(`/${href}`);
    } else if (onNavigate) {
      onNavigate(href);
    } else if (typeof document !== 'undefined') {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-lg border-b border-zinc-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/c80a657d-9749-4299-bbe9-63f2324be9a2" 
              alt="Elk Scooters Logo" 
              className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href, item.isRoute)}
                className="text-sm font-medium text-zinc-300 hover:text-amber-500 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => navigate("/scooters")}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 rounded-full"
            >
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 backdrop-blur-lg border-zinc-800">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href, item.isRoute)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-lg font-medium text-zinc-300 hover:text-amber-500 transition-colors text-left"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <Button 
                  onClick={() => navigate("/scooters")}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold mt-4"
                >
                  Shop Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}