import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-zinc-400 mb-8">
            Thank you for your purchase. You'll receive a confirmation email shortly with your order details and tracking information.
          </p>

          {sessionId && (
            <p className="text-sm text-zinc-500 mb-8">
              Order ID: {sessionId}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
            >
              Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/scooters")}
              className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
            >
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
