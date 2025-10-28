import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RiskGaugeProps {
  score: number;
  label: string;
  delay?: number;
}

const RiskGauge = ({ score, label, delay = 0 }: RiskGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getRiskLevel = (score: number): "low" | "medium" | "high" => {
    if (score < 40) return "low";
    if (score < 70) return "medium";
    return "high";
  };

  const risk = getRiskLevel(score);

  const riskColors = {
    low: "hsl(130, 43%, 55%)",
    medium: "hsl(38, 92%, 50%)",
    high: "hsl(0, 80%, 60%)",
  };

  const riskLabels = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
  };

  const riskEmojis = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 2;
        });
      }, 20);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative" style={{ width: 180, height: 180 }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90" width={180} height={180}>
          <circle
            cx={90}
            cy={90}
            r="60"
            stroke="hsl(var(--muted))"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={90}
            cy={90}
            r="60"
            stroke={riskColors[risk]}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay / 1000 }}
            style={{
              filter: `drop-shadow(0 0 10px ${riskColors[risk]})`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay / 1000 + 0.5, type: "spring" }}
            className="text-5xl font-bold font-poppins"
            style={{ color: riskColors[risk] }}
          >
            {animatedScore}
          </motion.div>
          <div className="text-xs text-muted-foreground font-inter">Score</div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-foreground font-poppins">{label}</h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay / 1000 + 0.7 }}
          className="px-4 py-2 rounded-full font-semibold text-sm text-white shadow-health-md inline-flex items-center gap-2"
          style={{
            background:
              risk === "low"
                ? "var(--gradient-risk-low)"
                : risk === "medium"
                ? "var(--gradient-risk-medium)"
                : "var(--gradient-risk-high)",
          }}
        >
          <span>{riskEmojis[risk]}</span>
          <span>{riskLabels[risk]}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RiskGauge;
