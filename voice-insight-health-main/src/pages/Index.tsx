import { useState } from "react";
import Layout from "@/components/Layout";
import RecordingInterface from "@/components/RecordingInterface";
import RiskSummaryCard from "@/components/RiskSummaryCard";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
  };

  const handleNewCheck = () => {
    setAnalysisResult(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {analysisResult ? (
          <RiskSummaryCard
            result={analysisResult}
            onNewCheck={handleNewCheck}
          />
        ) : (
          <RecordingInterface onAnalysisComplete={handleAnalysisComplete} />
        )}
      </div>
    </Layout>
  );
};

export default Index;
