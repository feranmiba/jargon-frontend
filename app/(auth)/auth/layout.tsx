
"use client";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const getContent = () => {
    if (pathname?.includes("signup")) {
      return {
        title: "Secure Your Digital Life",
        subtitle: "Join thousands protecting their data with enterprise-grade encryption",
        features: [
          "End-to-end encryption",
          "Zero-knowledge architecture",
          "GDPR & CCPA compliant"
        ]
      };
    } else if (pathname?.includes("verify")) {
      return {
        title: "Almost There!",
        subtitle: "We've sent a verification code to secure your account",
        features: [
          "Email verified",
          "Account secured",
          "Ready to protect your data"
        ]
      }; 
    } else if (pathname?.includes("login")) {
      return {
        title: "Welcome Back",
        subtitle: "Your privacy fortress awaits. Sign in securely.",
        features: [
          "Military-grade encryption",
          "Biometric authentication",
          "Zero data tracking"
        ]
      };
    } else if (pathname?.includes("create-profile")) {
      return {
        title: "Create Your Profile",
        subtitle: "Set up your secure digital identity to get started",
        features: [
          "Personalized security settings",
          "Data ownership & control",
          "Seamless access across devices"
        ]
      };
    } else {
      return {
        title: "Welcome to JARGON",
        subtitle: "Your gateway to secure and private digital identity management",
        features: [
          "Data ownership & control",
          "Decentralized identity",
          "Cutting-edge security"
        ]
      };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-base flex relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="relative z-10 p-12 flex flex-col justify-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Shield className="w-12 h-12 text-primary" />
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-3xl font-bold text-title">JARGON</span>
            </div>

            <motion.h1
              key={content.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-title mb-4 leading-tight"
            >
              {content.title}
            </motion.h1>
            <motion.p
              key={content.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl  opacity-70 mb-12"
            >
              {content.subtitle}
            </motion.p>

            {/* Features */}
            <div className="space-y-4">
              {content.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-base opacity-80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated Lock Illustration */}
            <motion.div
              className="mt-16 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative w-56 h-56 mx-auto">
                {/* Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-48 h-48 rounded-full border-2 border-primary/20" />
                </motion.div>
                
                {/* Middle Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-40 h-40 rounded-full border-2 border-primary/30 border-dashed" />
                </motion.div>

                {/* Lock Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Lock className="w-24 h-24 text-primary opacity-40 dark:opacity-30" />
                </motion.div>

                {/* Glow Effect */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        {children}
      </div>

   
    </div>
  );
}