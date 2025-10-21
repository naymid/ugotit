import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-8">
            <MessageSquare className="h-16 w-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CONTACT <span className="text-amber-500">US</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-12">
              Have questions? We're here to help!
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <Mail className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Email Us</h2>
            <p className="text-zinc-400 mb-6">
              For all inquiries, support, and questions, please reach out to:
            </p>
            <a
              href="mailto:elkscooters@gmail.com"
              className="text-2xl md:text-3xl font-bold text-amber-500 hover:text-amber-400 transition-colors inline-block mb-8"
            >
              elkscooters@gmail.com
            </a>
            <p className="text-sm text-zinc-500">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mt-8 border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
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
                <button onClick={() => navigate("/scooters#accessories")} className="hover:text-amber-500 transition-colors text-left">
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
