import React from "react";
import { motion } from "framer-motion";

interface ThemedLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ThemedLoader({ className = "", size = "sm" }: ThemedLoaderProps) {
  // Map size to pixel dimensions for consistent scaling
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={`relative flex flex-col items-center justify-center ${selectedSize} ${className}`}>
      <motion.svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current"
      >
        {/* Road / Ground line */}
        <motion.line
          x1="10"
          y1="48"
          x2="54"
          y2="48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 6"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -28 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 0.6,
          }}
        />
        
        {/* Vehicle Body */}
        <motion.path
          d="M 16 42 L 16 32 C 16 28 18 26 22 26 L 36 26 C 38 26 42 28 44 32 L 48 32 C 50 32 52 34 52 36 L 52 42 Z"
          fill="currentColor"
          initial={{ y: 0 }}
          animate={{ y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        />
        
        {/* Wheels */}
        <motion.circle
          cx="24"
          cy="42"
          r="4"
          fill="currentColor"
          initial={{ y: 0 }}
          animate={{ y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        />
        <motion.circle
          cx="44"
          cy="42"
          r="4"
          fill="currentColor"
          initial={{ y: 0 }}
          animate={{ y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        />

        {/* Windows */}
        <motion.path
          d="M 22 32 L 22 28 L 32 28 L 32 32 Z"
          fill="#fff" // Simple white window for contrast
          initial={{ y: 0 }}
          animate={{ y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M 34 32 L 34 28 L 40 28 L 42 32 Z"
          fill="#fff"
          initial={{ y: 0 }}
          animate={{ y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}
