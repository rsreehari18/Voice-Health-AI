import { AlertCircle, CheckCircle, Activity, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RiskGauge from "./RiskGauge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RiskSummaryCardProps {
  result: {
    timestamp: string;
    overallRisk: "low" | "medium" | "high";
    riskScore: number;
    conditions: {
      parkinsons: number;
      alzheimers: number;
      respiratory: number;
    };
    confidence: number;
    insights?: string;
  };
  onNewCheck: () => void;
}

const RiskSummaryCard = ({ result, onNewCheck }: RiskSummaryCardProps) => {
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="w-8 h-8 text-[hsl(130,43%,55%)]" />;
      case "medium":
        return <AlertCircle className="w-8 h-8 text-[hsl(38,92%,50%)]" />;
      case "high":
        return <AlertCircle className="w-8 h-8 text-[hsl(0,80%,60%)]" />;
      default:
        return null;
    }
  };

  const getGuidance = (risk: string) => {
    switch (risk) {
      case "low":
        return "Your voice analysis shows low risk indicators. Continue regular health monitoring and maintain healthy habits.";
      case "medium":
        return "Your analysis shows some indicators that warrant attention. Consider scheduling a check-up with your healthcare provider for professional evaluation.";
      case "high":
        return "Your analysis shows concerning indicators. We strongly recommend consulting a healthcare professional soon for a thorough evaluation.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          {getRiskIcon(result.overallRisk)}
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-2 font-poppins">
          Analysis Complete
        </h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2 font-inter">
          <Sparkles className="w-4 h-4 text-primary" />
          Completed {new Date(result.timestamp).toLocaleString()}
        </p>
      </motion.div>

      {/* Three Risk Gauges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-health-lg border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-poppins">Condition Analysis</CardTitle>
            <CardDescription className="font-inter">
              Individual risk assessments for each health indicator
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8">
            <div className="grid md:grid-cols-3 gap-8 md:gap-4">
              <RiskGauge
                score={result.conditions.parkinsons}
                label="Parkinson's Disease"
                delay={0}
              />
              <RiskGauge
                score={result.conditions.alzheimers}
                label="Alzheimer's Disease"
                delay={200}
              />
              <RiskGauge
                score={result.conditions.respiratory}
                label="Respiratory Health"
                delay={400}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights Panel */}
      {result.insights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-health-md border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-poppins">
                <Activity className="w-5 h-5 text-primary" />
                Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                {result.insights}
              </p>
              <div className="p-4 bg-card rounded-xl border border-border">
                <h4 className="font-semibold text-sm mb-2 font-poppins">Clinical Guidance</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                  {getGuidance(result.overallRisk)}
                </p>
                {result.overallRisk === "high" && (
                  <p className="text-xs text-muted-foreground italic mt-2 font-inter">
                    ⚠️ Consult a physician if high-risk persists across multiple checks.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Confidence & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-health-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
              <span className="text-sm font-medium font-poppins">Analysis Confidence</span>
              <span className="text-2xl font-bold text-primary font-poppins">
                {(result.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onNewCheck}
                className="w-full bg-gradient-primary hover:opacity-90 shadow-health-md text-lg py-6 font-poppins"
                size="lg"
              >
                Run Another Check
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RiskSummaryCard;
