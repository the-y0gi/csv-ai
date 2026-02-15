"use client";

import React from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  animate?: boolean; 
};

export default function Card({ children, className, animate = true }: CardProps) {
  const containerClasses = `
    relative overflow-hidden
    bg-[#161a1f]/60 backdrop-blur-xl
    border border-white/5 
    rounded-[24px] 
    p-6 
    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
    hover:border-brand-green/20 transition-all duration-500
    ${className}
  `;

  if (!animate) {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={containerClasses}
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}