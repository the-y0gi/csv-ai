"use client";

import { motion } from "framer-motion";
import { Rows, Columns, Zap, Activity } from "lucide-react"; // Icons for premium feel

export default function SummaryCards({ metadata }: { metadata: any }) {
  const stats = [
    {
      label: "Total Rows",
      value: metadata.rowCount?.toLocaleString() || "0",
      icon: Rows,
      description: "Total data entries",
      color: "text-brand-green",
    },
    {
      label: "Total Columns",
      value: metadata.columnCount || "0",
      icon: Columns,
      description: "Data attributes found",
      color: "text-blue-400",
    },
    {
      label: "Processing Speed",
      value: `${metadata.processingTimeMs || "0"} ms`,
      icon: Zap,
      description: "AI analysis latency",
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="premium-card group relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-green/5 blur-3xl group-hover:bg-brand-green/10 transition-colors duration-500" />
          
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-slate-800/50 ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <span className="text-sm font-medium text-slate-400 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </p>
              </div>
            </div>

            <div className="opacity-20 group-hover:opacity-40 transition-opacity">
              <Activity size={40} className={stat.color} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-green transition-all duration-500 group-hover:w-full" />
        </motion.div>
      ))}
    </div>
  );
}