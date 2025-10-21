import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowLeft, FileText } from "lucide-react";

export default function Terms() {
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
            <FileText className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          </div>

          <p className="text-zinc-400 mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-zinc-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using Elk Scooters' website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Product Information</h2>
              <p>
                We strive to provide accurate product descriptions and specifications. However, we do not warrant that product descriptions or other content on our website is accurate, complete, reliable, current, or error-free. All specifications are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Orders and Pricing</h2>
              <p className="mb-4">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product availability</li>
                <li>Errors in product or pricing information</li>
                <li>Suspected fraudulent transactions</li>
                <li>Orders that violate our terms</li>
              </ul>
              <p className="mt-4">
                Prices are subject to change without notice. The price charged will be the price displayed at the time of order placement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Shipping and Delivery</h2>
              <p>
                Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or circumstances beyond our control. Risk of loss and title for items purchased pass to you upon delivery to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Returns and Refunds</h2>
              <p>
                Please review our return policy carefully. Returns must be initiated within the specified timeframe and meet all conditions. Refunds will be processed to the original payment method within 5-10 business days of receiving the returned item.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Warranty</h2>
              <p>
                All Elk Scooters come with a 1-year limited warranty covering defects in materials and workmanship. The warranty does not cover normal wear and tear, misuse, accidents, or unauthorized modifications. For full warranty details, please visit our <button onClick={() => navigate("/warranty")} className="text-amber-500 hover:text-amber-400 underline">Warranty Page</button>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Safety and Usage</h2>
              <p className="mb-4">
                Electric scooters can be dangerous if not used properly. By purchasing and using our products, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Follow all local laws and regulations regarding electric scooter use</li>
                <li>Wear appropriate safety gear, including a helmet</li>
                <li>Read and follow all safety instructions and user manuals</li>
                <li>Not use the scooter while impaired or in unsafe conditions</li>
                <li>Maintain the scooter according to manufacturer guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Elk Scooters shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Elk Scooters and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at legal@elkscooters.com
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
