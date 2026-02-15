"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileSpreadsheet, Calendar, Hash, ArrowUpRight, Search, Filter } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports");
        setReports(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border-dark pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">Analytics Vault</h1>
          <p className="text-slate-400 text-sm">Access and manage all your AI-processed CSV intelligence reports.</p>
        </div>
        
        {/* <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-green transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Filter reports..." 
              className="bg-slate-900/50 border border-border-dark rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-green/30 w-64 transition-all"
            />
          </div>
          <button className="p-2.5 rounded-xl border border-border-dark bg-white/5 text-slate-400 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div> */}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-[24px] bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/reports/${report._id}`}>
                <Card className="group relative overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-green/5 blur-[50px] group-hover:bg-brand-green/10 transition-colors" />
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green border border-brand-green/20">
                      <FileSpreadsheet size={24} />
                    </div>
                    <div className="p-2 rounded-full bg-white/5 text-slate-500 group-hover:text-brand-green transition-colors">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-bold text-xl text-white tracking-tight line-clamp-1 group-hover:text-brand-green transition-colors">
                      {report.filename}
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          <Hash size={10} /> <span>Entries</span>
                        </div>
                        <p className="text-lg font-mono font-bold text-slate-200">
                          {report.rowCount.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          <Calendar size={10} /> <span>Processed</span>
                        </div>
                        <p className="text-sm font-medium text-slate-300">
                          {new Date(report.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {report.columnCount} Data Points
                    </span>
                    <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded uppercase">
                      Analyzed
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {reports.length === 0 && !loading && (
        <div className="text-center py-20 border-2 border-dashed border-border-dark rounded-[32px]">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
            <FileSpreadsheet size={32} />
          </div>
          <p className="text-white font-bold text-lg">No reports found</p>
          <p className="text-slate-500 text-sm mt-1">Upload your first CSV on the dashboard to see it here.</p>
          <Link href="/" className="inline-block mt-6 text-brand-green font-bold text-sm hover:underline italic">
            Go to Upload →
          </Link>
        </div>
      )}
    </div>
  );
}