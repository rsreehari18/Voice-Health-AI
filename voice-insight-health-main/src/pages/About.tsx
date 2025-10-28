import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Waves, Shield, AlertTriangle, CheckCircle2, Users, Lock, FileText, Activity } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground font-poppins">
            How Voice Health AI Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
            Advanced voice analysis technology for early detection of neurological and respiratory conditions
          </p>
        </motion.div>

        {/* Main Feature Cards */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-health-md border-2 hover:shadow-health-lg transition-shadow">
            <CardHeader>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <Brain className="w-14 h-14 text-primary" />
              </motion.div>
              <CardTitle className="font-poppins">AI-Powered Analysis</CardTitle>
              <CardDescription className="font-inter">
                Machine learning algorithms analyze voice patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed font-inter">
              Our system uses state-of-the-art machine learning models trained on thousands
              of voice samples to detect subtle patterns that may indicate early signs of
              Parkinson's, Alzheimer's, and respiratory diseases.
            </CardContent>
          </Card>

          <Card className="shadow-health-md border-2 hover:shadow-health-lg transition-shadow">
            <CardHeader>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <Waves className="w-14 h-14 text-secondary" />
              </motion.div>
              <CardTitle className="font-poppins">Voice Biomarkers</CardTitle>
              <CardDescription className="font-inter">
                Analyzing speech patterns and vocal characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed font-inter">
              We analyze multiple voice features including pitch variation, speech rate,
              articulation clarity, tremor, and phonation patterns that research has linked
              to neurological and respiratory health.
            </CardContent>
          </Card>

          <Card className="shadow-health-md border-2 hover:shadow-health-lg transition-shadow bg-gradient-to-br from-secondary/5 to-transparent">
            <CardHeader>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-4"
              >
                <Lock className="w-14 h-14 text-secondary" />
              </motion.div>
              <CardTitle className="font-poppins">Privacy First</CardTitle>
              <CardDescription className="font-inter">
                Your data stays secure and private
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed font-inter">
              All voice analysis happens with your explicit consent. Your recordings are
              processed securely and not stored permanently. We prioritize your privacy
              and comply with health data protection standards.
            </CardContent>
          </Card>

          <Card className="shadow-health-md border-2 hover:shadow-health-lg transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <motion.div
                whileHover={{ y: -5 }}
                className="mb-4"
              >
                <Users className="w-14 h-14 text-primary" />
              </motion.div>
              <CardTitle className="font-poppins">Clinical Validation</CardTitle>
              <CardDescription className="font-inter">
                Based on peer-reviewed research
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed font-inter">
              Our analysis methods are based on extensive research published in medical
              journals. Voice analysis has shown promise in early detection, though it
              should complement, not replace, clinical evaluation.
            </CardContent>
          </Card>
        </motion.div>

        {/* How It Works Process */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-health-lg border-2 bg-gradient-hero">
            <CardHeader>
              <CardTitle className="text-3xl font-poppins text-white">Simple 3-Step Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Record Your Voice",
                  description: "Simply record a 10-second voice sample by reading a sentence or speaking naturally. Or upload a pre-recorded audio file.",
                  icon: <Activity className="w-6 h-6" />,
                },
                {
                  step: 2,
                  title: "AI Analysis",
                  description: "Our machine learning model analyzes multiple voice features including pitch, rhythm, articulation, and other biomarkers linked to health conditions.",
                  icon: <Brain className="w-6 h-6" />,
                },
                {
                  step: 3,
                  title: "Get Results",
                  description: "Receive a risk assessment with detailed breakdowns for each condition and recommendations for next steps if needed.",
                  icon: <CheckCircle2 className="w-6 h-6" />,
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-health-sm"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-primary text-white flex items-center justify-center font-bold text-2xl shadow-health-md"
                  >
                    {item.step}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-foreground font-poppins flex items-center gap-2">
                      {item.title}
                      {item.icon}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-health-md border-2 border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent">
            <CardHeader>
              <AlertTriangle className="w-12 h-12 text-destructive mb-2" />
              <CardTitle className="text-2xl font-poppins">Important Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground font-inter">
              {[
                "This is a screening tool, not a diagnostic device. Results should not be used to self-diagnose.",
                "Always consult healthcare professionals for proper medical evaluation and diagnosis.",
                "Regular monitoring is recommended. If you consistently receive high-risk assessments, seek professional medical advice.",
                "This tool complements, not replaces, traditional medical screening and diagnosis methods.",
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-foreground">{text.split(",")[0]}</strong>
                    {text.substring(text.indexOf(","))}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Privacy Section */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-health-md border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <Shield className="w-12 h-12 text-primary mb-2" />
              <CardTitle className="text-2xl font-poppins">Data Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed font-inter">
              <p>
                Your privacy and data security are our top priorities. All voice recordings are processed
                with end-to-end encryption and are never stored permanently on our servers.
              </p>
              <p>
                Analysis results are stored locally on your device only. We do not share your health
                data with third parties or use it for marketing purposes.
              </p>
              <p className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                For full details, please review our complete Privacy Policy and Terms of Service.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default About;
