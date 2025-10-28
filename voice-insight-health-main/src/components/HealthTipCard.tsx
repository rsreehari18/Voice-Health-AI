import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const healthTips = [
  "Stay hydrated — dryness affects your vocal tone and clarity",
  "Get 7-8 hours of sleep for optimal brain and voice health",
  "Practice deep breathing exercises to improve respiratory strength",
  "Reduce caffeine intake — it can dry out your vocal cords",
  "Regular exercise improves both lung capacity and vocal projection",
  "Avoid smoking and secondhand smoke for respiratory health",
  "Warm up your voice with gentle humming before speaking",
  "Maintain good posture to support proper breathing and voice production",
  "Limit alcohol consumption — it affects vocal cord function",
  "Take vocal breaks during long periods of speaking",
];

const HealthTipCard = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-health-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="flex-shrink-0 p-3 bg-gradient-primary rounded-2xl shadow-health-sm"
            >
              <Lightbulb className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground font-poppins">
                  Voice Health Tip of the Day
                </h3>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                {tip}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HealthTipCard;
