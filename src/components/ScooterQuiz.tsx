import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, RotateCcw, Eye, Zap, Mountain, Gauge, DollarSign } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface QuizProps {
  open: boolean;
  onClose: () => void;
}

type QuizAnswers = {
  wheels?: number;
  terrain?: string;
  speed?: string;
  budget?: string;
};

export function ScooterQuiz({ open, onClose }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const scooters = useQuery(api.scooters.getAllScooters);

  const questions = [
    {
      id: "wheels",
      question: "Two or Three Wheels?",
      icon: Zap,
      options: [
        { label: "Two Wheels", value: 2, description: "Agile & Fast" },
        { label: "Three Wheels", value: 3, description: "Stable & Powerful" },
      ],
    },
    {
      id: "terrain",
      question: "Where Will You Ride Most?",
      icon: Mountain,
      options: [
        { label: "City Streets", value: "city", description: "Smooth pavement" },
        { label: "Mixed Terrain", value: "mixed", description: "City + trails" },
        { label: "Off-Road", value: "offroad", description: "Rugged trails" },
      ],
    },
    {
      id: "speed",
      question: "Top Speed You Want?",
      icon: Gauge,
      options: [
        { label: "25 MPH", value: "25", description: "Casual cruising" },
        { label: "35 MPH", value: "35", description: "Spirited riding" },
        { label: "45+ MPH", value: "45", description: "Maximum thrill" },
      ],
    },
    {
      id: "budget",
      question: "What's Your Range?",
      icon: DollarSign,
      options: [
        { label: "Under $1,500", value: "low", description: "Best value" },
        { label: "$1,500 - $2,000", value: "mid", description: "Premium features" },
        { label: "$2,000+", value: "high", description: "Top performance" },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateMatches = () => {
    if (!scooters) return [];

    const scored = scooters.map((scooter) => {
      let score = 0;

      if (answers.wheels === scooter.wheels) score += 3;
      
      if (answers.terrain === "offroad" && scooter.tire.includes("Off-road")) score += 3;
      if (answers.terrain === "mixed" && scooter.range === "30 mi") score += 2;
      if (answers.terrain === "city") score += 1;

      const speedNum = parseInt(scooter.maxSpeed);
      if (answers.speed === "25" && speedNum <= 25) score += 3;
      if (answers.speed === "35" && speedNum >= 30 && speedNum <= 40) score += 3;
      if (answers.speed === "45" && speedNum >= 40) score += 3;

      if (answers.budget === "low" && scooter.price < 1500) score += 2;
      if (answers.budget === "mid" && scooter.price >= 1500 && scooter.price <= 2000) score += 2;
      if (answers.budget === "high" && scooter.price > 2000) score += 2;

      if (scooter.range === "30 mi") score += 1;

      return { ...scooter, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 2);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((step + 1) / questions.length) * 100;
  const currentQuestion = questions[step];
  const Icon = currentQuestion?.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 border-amber-500/20 max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-br from-black via-zinc-900 to-black min-h-[500px]">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10 p-8 pt-16"
              >
                <div className="mb-8">
                  <Progress value={progress} className="h-2 mb-4" />
                  <p className="text-amber-500 text-sm font-medium text-center">
                    Question {step + 1} of {questions.length}
                  </p>
                </div>

                <div className="text-center mb-12">
                  {Icon && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6"
                    >
                      <Icon className="w-10 h-10 text-amber-500" />
                    </motion.div>
                  )}
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="grid gap-4 max-w-2xl mx-auto">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:bg-zinc-800/50 transition-all duration-300 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
                            {option.label}
                          </h3>
                          <p className="text-zinc-400 text-sm">{option.description}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-zinc-700 group-hover:border-amber-500 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 p-8 pt-16"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                      YOUR PERFECT MATCH
                    </h2>
                    <p className="text-zinc-400">Based on your preferences</p>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                  {calculateMatches().map((scooter, idx) => (
                    <motion.div
                      key={scooter.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className={`relative bg-zinc-900/80 border rounded-xl overflow-hidden ${
                        scooter.inStock ? "border-amber-500/30" : "border-zinc-800"
                      }`}
                    >
                      {!scooter.inStock && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            SOLD OUT
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <img
                          src={scooter.image}
                          alt={scooter.name}
                          className="w-full h-48 object-contain mb-4"
                        />
                        <h3 className="text-2xl font-bold text-white mb-2">{scooter.name}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {scooter.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="text-zinc-400">
                            <span className="text-white font-semibold">{scooter.power}</span> Power
                          </div>
                          <div className="text-zinc-400">
                            <span className="text-white font-semibold">{scooter.maxSpeed}</span> Top Speed
                          </div>
                          <div className="text-zinc-400">
                            <span className="text-white font-semibold">{scooter.range}</span> Range
                          </div>
                          <div className="text-zinc-400">
                            <span className="text-white font-semibold">{scooter.wheels}</span> Wheels
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
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake Quiz
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
