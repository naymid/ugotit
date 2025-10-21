import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowLeft, Cookie } from "lucide-react";

export default function Cookies() {
  const navigate = useNavigate();

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl md:text-5xl font-bold">Cookies Policy</h1>
          </div>

          <p className="text-zinc-400 mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-zinc-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
              <p className="mb-4">We use cookies for several purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, including shopping cart functionality and secure login</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and choices to provide enhanced features</li>
                <li><strong>Marketing Cookies:</strong> Track your browsing habits to deliver relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-amber-500 mb-3">Session Cookies</h3>
                  <p>
                    These temporary cookies are deleted when you close your browser. They help us maintain your session as you navigate through our website.
                  </p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-amber-500 mb-3">Persistent Cookies</h3>
                  <p>
                    These cookies remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.
                  </p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-amber-500 mb-3">Third-Party Cookies</h3>
                  <p>
                    Some cookies are placed by third-party services that appear on our pages, such as analytics providers and payment processors.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Adjusting your browser settings to refuse all or some cookies</li>
                <li>Deleting cookies that have already been set</li>
                <li>Using browser plugins that manage cookie preferences</li>
              </ul>
              <p className="mt-4">
                Please note that if you choose to block or delete cookies, some features of our website may not function properly, and your user experience may be affected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Browser-Specific Instructions</h2>
              <p className="mb-4">To manage cookies in your browser:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Analytics and Tracking</h2>
              <p>
                We use analytics services to help us understand how our website is being used. These services may use cookies to collect information about your visit, including pages viewed, time spent on the site, and navigation paths. This information is aggregated and anonymous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please check this page periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at privacy@elkscooters.com
              </p>
            </section>
          </div>
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
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Contact Us
                </a>
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
