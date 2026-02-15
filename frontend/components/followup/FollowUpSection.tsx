"use client";

import { useState, useRef, useEffect } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MessageSquare, Send, Bot, User, Loader2, Eraser } from "lucide-react";
import ReactMarkdown from "react-markdown";

type QA = {
  question: string;
  answer: string;
};

export default function FollowUpSection({ reportId }: { reportId: string }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<QA[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question;
    setQuestion("");
    setLoading(true);

    try {
      const res = await api.post("/followup", {
        reportId,
        question: currentQuestion,
      });
      setHistory((prev) => [
        ...prev,
        { question: currentQuestion, answer: res.data.data.answer },
      ]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "AI Engine busy. Try again.");
      setQuestion(currentQuestion); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
            <MessageSquare size={16} className="text-brand-green" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Data Assistant
          </h2>
        </div>
        <button
          onClick={() => setHistory([])}
          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
          title="Clear Chat"
        >
          <Eraser size={16} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto pr-2 mb-6 premium-scrollbar"
        style={{ minHeight: "300px" }}
      >
        {history.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
            <Bot size={40} className="mb-3" />
            <p className="text-sm font-medium">
              Ask anything about this dataset...
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try: "What's the highest growth metric?"
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-slate-800/50 border border-border-dark px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[85%]">
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {item.question}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 border border-border-dark">
                  <User size={14} className="text-slate-300" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 border border-brand-green/20">
                  <Bot size={14} className="text-brand-green" />
                </div>
                {/* <div className="bg-brand-green/[0.03] border border-brand-green/10 px-4 py-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-[0_0_20px_rgba(16,185,129,0.02)]">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-light italic">
                    {item.answer}
                  </p>
                </div> */}
                <div className="bg-brand-green/[0.03] border border-brand-green/10 px-4 py-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-[0_0_20px_rgba(16,185,129,0.02)]">
                  <div className="text-sm text-slate-300 leading-relaxed font-light italic prose prose-invert">
                    <ReactMarkdown>{item.answer}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center">
              <Loader2 size={14} className="text-brand-green animate-spin" />
            </div>
            <div className="bg-brand-green/5 px-4 py-2 rounded-2xl border border-brand-green/10">
              <span className="text-xs text-brand-green font-medium animate-pulse">
                Assistant is thinking...
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Type a command or question..."
          className="w-full bg-[#0d0f12] border border-border-dark rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-all shadow-inner"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-green text-black hover:bg-brand-green/90 disabled:opacity-30 disabled:hover:bg-brand-green transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
