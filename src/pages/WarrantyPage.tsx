import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Shield, CheckCircle, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function WarrantyPage() {
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
            <Shield className="h-16 w-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              1-YEAR WARRANTY
            </h1>
            <p className="text-xl text-zinc-400">
              Comprehensive coverage for your Elk Scooter
            </p>
          </div>

          {/* Overview */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Warranty Overview</h2>
            <p className="text-zinc-300 leading-relaxed">
              All Elk Scooters come with a comprehensive 1-year warranty from the date of purchase. 
              We stand behind the quality of our products and are committed to ensuring your satisfaction 
              and peace of mind.
            </p>
          </div>

          {/* What's Covered */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-8 w-8 text-amber-500" />
              <h2 className="text-2xl font-bold">What's Covered</h2>
            </div>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Our warranty covers defects in materials and workmanship under normal use. If any parts 
                become defective through normal use (not damage), we will send replacement parts at no 
                additional cost.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Motor and electrical components</li>
                <li>Battery defects (excluding normal capacity degradation)</li>
                <li>Frame and structural components</li>
                <li>Controller and display systems</li>
                <li>Suspension components</li>
                <li>Brake systems (excluding pads)</li>
              </ul>
            </div>
          </div>

          {/* What's Not Covered */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-2xl font-bold">What's Not Covered</h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-zinc-300 ml-4">
              <li>Damage from accidents, crashes, or collisions</li>
              <li>Damage from misuse, abuse, or neglect</li>
              <li>Normal wear and tear items (tires, brake pads, grips)</li>
              <li>Modifications or unauthorized repairs</li>
              <li>Cosmetic damage that doesn't affect functionality</li>
              <li>Water damage from submersion or pressure washing</li>
              <li>Damage from improper storage or maintenance</li>
              <li>Battery capacity degradation (normal over time)</li>
            </ul>
          </div>

          {/* How to Claim */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-8 w-8 text-amber-500" />
              <h2 className="text-2xl font-bold">How to File a Warranty Claim</h2>
            </div>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Filing a warranty claim is simple and straightforward:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Contact our support team via email or phone</li>
                <li>Provide your order number and purchase date</li>
                <li>Describe the issue with photos or videos if possible</li>
                <li>Our team will review and approve eligible claims within 24-48 hours</li>
                <li>Replacement parts will be shipped to you at no cost</li>
              </ol>
              <div className="mt-6 pt-6 border-t border-amber-500/30">
                <p className="font-semibold text-amber-500 mb-2">Contact Support:</p>
                <p>Email: support@elkscooters.com</p>
                <p>Phone: 1-800-ELK-RIDE</p>
                <p className="text-sm text-zinc-400 mt-2">
                  Response time: Within 24 hours on business days
                </p>
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
