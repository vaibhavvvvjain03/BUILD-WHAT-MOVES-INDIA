import React from "react";
import { motion } from "framer-motion";

interface ThemedLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ThemedLoader({ className = "", size = "sm" }: ThemedLoaderProps) {
  // Map size to pixel dimensions for consistent scaling
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={`relative flex items-center justify-center ${selectedSize} ${className}`}>
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full text-current"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1.2,
        }}
      >
        {/* Outer subtle ring */}
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        
        {/* Animated dynamic arc */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="40 80"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -120 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1.5,
          }}
        />
      </motion.svg>
      {/* Inner dot pulse to feel like an engine/heartbeat */}
      <motion.div
        className="w-[20%] h-[20%] bg-current rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
    </div>
  );
}
