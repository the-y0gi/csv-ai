"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  value: string;
};

export default function StatusBadge({ label, value }: Props) {
  const isGood = ["OK", "Connected", "Working", "Active", "Success"].includes(value);
  const isPending = ["Processing", "Pending", "Linking"].includes(value);

  return (
    <div className="flex items-center justify-between bg-[#161a1f] p-4 rounded-2xl border border-border-dark hover:border-brand-green/20 transition-colors group">
      <div className="flex items-center gap-2">
        <div className={`w-1 h-1 rounded-full ${isGood ? 'bg-brand-green' : 'bg-red-500'} opacity-40`} />
        <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
          {label}
        </span>
      </div>

      <div className="relative flex items-center">
        {isGood && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-brand-green/20 blur-md rounded-full"
          />
        )}

        <span
          className={`
            relative z-10 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg border
            ${isGood 
              ? "bg-brand-green/5 text-brand-green border-brand-green/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
              : isPending
                ? "bg-amber-500/5 text-amber-500 border-amber-500/20"
                : "bg-red-500/5 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
            }
          `}
        >
          <span className="flex items-center gap-1.5">
            <span className={`w-1 h-1 rounded-full ${isGood ? 'bg-brand-green' : isPending ? 'bg-amber-500' : 'bg-red-500'}`} />
            {value}
          </span>
        </span>
      </div>
    </div>
  );
}