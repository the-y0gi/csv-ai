"use client";

import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline"; 
};

export default function Button({
  children,
  onClick,
  className,
  disabled,
  variant = "primary",
}: ButtonProps) {
  
  const baseStyles = "relative overflow-hidden px-6 py-2.5 rounded-xl font-bold tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-green text-black hover:bg-brand-green/90 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md",
    outline: "bg-transparent border border-brand-green/30 text-brand-green hover:bg-brand-green/5",
  };

  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -1 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
      )}
      
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}