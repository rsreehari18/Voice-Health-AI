import { useState, useRef, useEffect } from "react";
import { Mic, Square, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import HealthTipCard from "./HealthTipCard";

interface RecordingInterfaceProps {
  onAnalysisComplete: (result: any) => void;
}

const RecordingInterface = ({ onAnalysisComplete }: RecordingInterfaceProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "hsl(217, 89%, 63%)",
        progressColor: "hsl(130, 43%, 55%)",
        cursorColor: "transparent",
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        height: 80,
        normalize: true,
        backend: "WebAudio",
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Initialize waveform with live microphone
      if (wavesurferRef.current) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        
        // Simple visualization
        const updateWaveform = () => {
          if (isRecording) {
            requestAnimationFrame(updateWaveform);
          }
        };
        updateWaveform();
      }

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        analyzeRecording();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setAnalysisComplete(false);

      // Auto-stop after 10 seconds
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 9) {
            stopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);

      toast({
        title: "🎙️ Recording started",
        description: "Speak clearly for 10 seconds",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const analyzeRecording = async () => {
    setIsAnalyzing(true);

    // Simulate analysis with realistic timing
    await new Promise(resolve => setTimeout(resolve, 3500));

    const mockResult = {
      timestamp: new Date().toISOString(),
      overallRisk: Math.random() > 0.5 ? "low" : Math.random() > 0.5 ? "medium" : "high",
      riskScore: Math.floor(Math.random() * 100),
      conditions: {
        parkinsons: Math.floor(Math.random() * 100),
        alzheimers: Math.floor(Math.random() * 100),
        respiratory: Math.floor(Math.random() * 100),
      },
      confidence: 0.85 + Math.random() * 0.15,
      insights: "Your voice shows slight irregularity in tone and breathing rhythm. It's advised to recheck tomorrow for consistent monitoring.",
    };

    // Save to history
    const history = JSON.parse(localStorage.getItem("voiceHealthHistory") || "[]");
    history.unshift(mockResult);
    localStorage.setItem("voiceHealthHistory", JSON.stringify(history.slice(0, 20)));

    setIsAnalyzing(false);
    setAnalysisComplete(true);

    // Show success animation, then navigate to results
    await new Promise(resolve => setTimeout(resolve, 1500));
    onAnalysisComplete(mockResult);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("audio")) {
      toast({
        title: "Invalid file",
        description: "Please upload an audio file",
        variant: "destructive",
      });
      return;
    }

    // Load file into waveform
    if (wavesurferRef.current) {
      const url = URL.createObjectURL(file);
      await wavesurferRef.current.load(url);
    }

    chunksRef.current = [file];
    toast({
      title: "📁 File uploaded",
      description: "Starting analysis...",
    });
    analyzeRecording();
  };

  return (
    <div className="space-y-8">
      {/* Health Tip */}
      <HealthTipCard />

      {/* Main Recording Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="text-center max-w-xl">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-foreground mb-3 font-poppins"
          >
            Voice Analysis
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-inter"
          >
            Record a 10-second voice sample or upload an audio file for early health screening
          </motion.p>
        </div>

        {/* Waveform Visualization */}
        {(isRecording || isAnalyzing) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-2xl"
          >
            <div
              ref={waveformRef}
              className="w-full bg-card rounded-2xl p-4 shadow-health-md border-2 border-primary/20"
            />
          </motion.div>
        )}

        {/* Recording Button */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {analysisComplete ? (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-success"
                >
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg font-semibold text-secondary font-poppins"
                >
                  ✅ Analysis Complete
                </motion.p>
              </motion.div>
            ) : (
              <>
                {isRecording && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-destructive/30 rounded-full blur-xl"
                  />
                )}
                <motion.div
                  whileHover={{ scale: isAnalyzing ? 1 : 1.05 }}
                  whileTap={{ scale: isAnalyzing ? 1 : 0.95 }}
                >
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isAnalyzing}
                    size="lg"
                    className={`w-36 h-36 rounded-full shadow-health-lg hover:shadow-health-glow transition-all ${
                      isRecording
                        ? "bg-destructive hover:bg-destructive/90"
                        : "bg-gradient-primary hover:opacity-90"
                    }`}
                  >
                    {isAnalyzing ? (
                      <Loader2 className="w-14 h-14 animate-spin" />
                    ) : isRecording ? (
                      <Square className="w-14 h-14" />
                    ) : (
                      <Mic className="w-14 h-14" />
                    )}
                  </Button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Recording Timer */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2 font-poppins">
                {recordingTime}s
              </div>
              <p className="text-sm text-muted-foreground font-inter">
                Recording... {10 - recordingTime}s remaining
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analyzing State */}
        <AnimatePresence>
          {isAnalyzing && !analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl font-semibold text-primary mb-2 font-poppins"
              >
                Analyzing your voice...
              </motion.p>
              <p className="text-sm text-muted-foreground font-inter">
                Processing voice biomarkers and patterns
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Upload Option */}
        {!isRecording && !isAnalyzing && !analysisComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4 w-full max-w-md"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground font-inter">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <label className="cursor-pointer w-full">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 w-full border-2 hover:border-primary hover:bg-primary/5"
                  asChild
                >
                  <span>
                    <Upload className="w-5 h-5" />
                    Upload Audio File
                  </span>
                </Button>
              </motion.div>
            </label>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RecordingInterface;
