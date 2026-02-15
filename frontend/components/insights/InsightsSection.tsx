"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, Copy, Share2, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function InsightsSection({ insights }: { insights: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(insights);
    toast.success("Insights copied to clipboard", {
      style: {
        background: "#0f1115",
        color: "#10b981",
        border: "1px solid #22272e",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full"
    >
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-green/10 rounded-lg">
            <Sparkles className="text-brand-green w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            AI Analysis Insights
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-md border border-border-dark bg-card-dark text-slate-400 hover:text-brand-green hover:border-brand-green/30 transition-all"
            title="Copy to clipboard"
          >
            <Copy size={18} />
          </button>
          <button className="p-2 rounded-md border border-border-dark bg-card-dark text-slate-400 hover:text-blue-400 transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 group">
        <div className="absolute -left-2 -top-2 w-4 h-4 border-l-2 border-t-2 border-brand-green/30 group-hover:border-brand-green transition-colors" />

        <div className="bg-[#0f1115]/50 border border-border-dark rounded-2xl p-6 h-[400px] overflow-y-auto scrollbar-thin premium-scrollbar">
          <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-green/60">
            <Terminal size={12} />
            <span>Generated Intelligence Report</span>
          </div>
          {/* 
          <div className="text-slate-300 leading-relaxed font-light text-lg whitespace-pre-line">

            {insights}
          </div> */}

          <div className="text-slate-300 leading-relaxed font-light text-lg whitespace-pre-line">
            <ReactMarkdown
              components={{
                strong: ({ node, ...props }) => (
                  <span className="font-bold text-brand-green" {...props} />
                ),
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-4 space-y-2 mb-4" {...props} />
                ),
              }}
            >
              {insights}
            </ReactMarkdown>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card-dark to-transparent pointer-events-none rounded-b-2xl" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-card-dark bg-slate-800 flex items-center justify-center text-[8px] font-bold"
            >
              AI
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Verified by Neural Engine v4.2
        </p>
      </div>
    </motion.div>
  );
}
