import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar, TrendingDown, TrendingUp, Minus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

const History = () => {
  const [history, setHistory] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("voiceHealthHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const chartData = history
    .slice(0, 5)
    .reverse()
    .map((item, index) => ({
      check: `Check ${history.length - 4 + index}`,
      date: new Date(item.timestamp).toLocaleDateString(),
      parkinsons: item.conditions.parkinsons,
      alzheimers: item.conditions.alzheimers,
      respiratory: item.conditions.respiratory,
    }));

  const getRiskBadge = (risk: string) => {
    const styles = {
      low: "bg-gradient-risk-low text-white",
      medium: "bg-gradient-risk-medium text-white",
      high: "bg-gradient-risk-high text-white",
    };
    return styles[risk as keyof typeof styles] || styles.low;
  };

  const getTrendIcon = () => {
    if (history.length < 2) return <Minus className="w-5 h-5" />;
    const latest = history[0].riskScore;
    const previous = history[1].riskScore;
    
    if (latest < previous) return <TrendingDown className="w-5 h-5 text-[hsl(130,43%,55%)]" />;
    if (latest > previous) return <TrendingUp className="w-5 h-5 text-[hsl(0,80%,60%)]" />;
    return <Minus className="w-5 h-5" />;
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    
    // Title
    pdf.setFontSize(20);
    pdf.setTextColor(76, 139, 245);
    pdf.text("Voice Health AI - Health Report", 20, 20);
    
    // Date
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 28);
    
    // Summary
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Analysis History Summary", 20, 40);
    
    pdf.setFontSize(10);
    pdf.text(`Total Checks: ${history.length}`, 20, 50);
    
    if (history.length > 0) {
      const latest = history[0];
      pdf.text(`Latest Check: ${new Date(latest.timestamp).toLocaleString()}`, 20, 58);
      pdf.text(`Overall Risk: ${latest.overallRisk.toUpperCase()}`, 20, 66);
      pdf.text(`Parkinson's: ${latest.conditions.parkinsons}%`, 20, 74);
      pdf.text(`Alzheimer's: ${latest.conditions.alzheimers}%`, 20, 82);
      pdf.text(`Respiratory: ${latest.conditions.respiratory}%`, 20, 90);
    }
    
    // History Table
    if (history.length > 0) {
      pdf.setFontSize(12);
      pdf.text("Recent Checks", 20, 105);
      
      let yPos = 115;
      history.slice(0, 10).forEach((item, index) => {
        pdf.setFontSize(9);
        pdf.text(
          `${index + 1}. ${new Date(item.timestamp).toLocaleDateString()} - Risk: ${item.overallRisk}`,
          25,
          yPos
        );
        yPos += 8;
      });
    }
    
    // Disclaimer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      "This report is for informational purposes only and does not replace professional medical advice.",
      20,
      280
    );
    
    pdf.save("voice-health-report.pdf");
    
    toast({
      title: "✅ PDF Downloaded",
      description: "Your health report has been saved",
    });
  };

  if (history.length === 0) {
    return (
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center py-16"
        >
          <Calendar className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2 font-poppins">No History Yet</h2>
          <p className="text-muted-foreground font-inter">
            Your voice check history will appear here after your first analysis
          </p>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-poppins">Check History</h1>
            <p className="text-muted-foreground font-inter">
              Track your voice health screenings over time
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={downloadPDF}
              variant="outline"
              className="gap-2 border-2 hover:border-primary hover:bg-primary/5"
            >
              <Download className="w-4 h-4" />
              Download PDF Report
            </Button>
          </motion.div>
        </motion.div>

        {/* Trend Chart */}
        {history.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-health-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-poppins">
                  {getTrendIcon()}
                  Trend Analysis
                </CardTitle>
                <CardDescription className="font-inter">
                  Your risk scores over the last 5 checks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="check"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      fontFamily="Inter, sans-serif"
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      domain={[0, 100]}
                      fontFamily="Inter, sans-serif"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--primary))",
                        borderRadius: "0.75rem",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                    <Legend fontFamily="Inter, sans-serif" />
                    <Line
                      type="monotone"
                      dataKey="parkinsons"
                      stroke="hsl(217, 89%, 63%)"
                      strokeWidth={3}
                      name="Parkinson's"
                      dot={{ fill: "hsl(217, 89%, 63%)", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="alzheimers"
                      stroke="hsl(130, 43%, 55%)"
                      strokeWidth={3}
                      name="Alzheimer's"
                      dot={{ fill: "hsl(130, 43%, 55%)", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="respiratory"
                      stroke="hsl(38, 92%, 50%)"
                      strokeWidth={3}
                      name="Respiratory"
                      dot={{ fill: "hsl(38, 92%, 50%)", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* History List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground font-poppins">All Checks</h2>
          <div className="grid gap-4">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="shadow-health-sm hover:shadow-health-md transition-all border-2 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className={`px-5 py-2 rounded-full text-sm font-semibold ${getRiskBadge(
                              item.overallRisk
                            )}`}
                          >
                            {item.overallRisk.charAt(0).toUpperCase() + item.overallRisk.slice(1)} Risk
                          </span>
                          <span className="text-3xl font-bold text-primary font-poppins">
                            {item.riskScore}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 font-inter">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-center">
                        {Object.entries(item.conditions).map(([condition, score]) => (
                          <div key={condition} className="space-y-1">
                            <div className="text-xs text-muted-foreground capitalize font-inter">
                              {condition}
                            </div>
                            <div className="text-xl font-semibold text-foreground font-poppins">
                              {score as number}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
