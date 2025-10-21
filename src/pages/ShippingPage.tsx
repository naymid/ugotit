import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Truck, Package, MapPin, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function ShippingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <Truck className="h-16 w-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SHIPPING INFORMATION
            </h1>
            <p className="text-xl text-zinc-400">
              Fast and reliable delivery to your door
            </p>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 mb-8 text-center">
            <p className="text-black font-bold text-2xl">
              🎉 FREE SHIPPING ON ALL SCOOTERS
            </p>
            <p className="text-black/80 mt-2">
              No hidden fees. What you see is what you pay.
            </p>
          </div>

          {/* Processing Time */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-amber-500" />
              <h2 className="text-2xl font-bold">Processing Time</h2>
            </div>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                All scooters are carefully inspected and shipped within{" "}
                <span className="text-amber-500 font-semibold">3 business days</span> of order 
                confirmation. You'll receive a tracking number via email once your order ships.
              </p>
              <div className="bg-zinc-800/50 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong className="text-white">Note:</strong> Orders placed on weekends or holidays 
                  will be processed on the next business day.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-8 w-8 text-amber-500" />
              <h2 className="text-2xl font-bold">Shipping Method</h2>
            </div>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Scooters are shipped via{" "}
                <span className="text-amber-500 font-semibold">freight delivery</span> to ensure 
                safe transport. The freight carrier will contact you to schedule a delivery appointment 
                within 5-7 business days of shipment.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">Delivery Window</h3>
                  <p className="text-sm">5-7 business days after shipment</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">Tracking Updates</h3>
                  <p className="text-sm">Real-time tracking via email and SMS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-8 w-8 text-amber-500" />
              <h2 className="text-2xl font-bold">Delivery Requirements</h2>
            </div>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Scooters must be shipped to a{" "}
                <span className="text-amber-500 font-semibold">residential address</span>. Please 
                ensure someone is available to receive the delivery during the scheduled time window.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Signature required upon delivery</li>
                <li>Valid phone number needed for carrier contact</li>
                <li>Clear access to delivery location</li>
                <li>Someone 18+ must be present to sign</li>
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-amber-500">Important Delivery Information</h2>
                <div className="space-y-3 text-zinc-300">
                  <p className="leading-relaxed">
                    <strong className="text-white">Curbside Delivery:</strong> Freight deliveries are 
                    curbside only. The driver will not bring the scooter inside your home or up stairs.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-white">Weight Consideration:</strong> Scooters can weigh 
                    between 80-150 lbs depending on the model. Please arrange for assistance if needed.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-white">Inspection:</strong> Inspect your scooter immediately 
                    upon delivery. Report any shipping damage to the carrier and our support team within 
                    24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={() => navigate("/scooters")}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-6 rounded-full"
            >
              Shop All Scooters
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
