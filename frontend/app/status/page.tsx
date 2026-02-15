"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import StatusBadge from "@/components/ui/StatusBadge";
import Card from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { formatUptime } from "@/lib/utils";
import { Activity, Cpu, Clock, ShieldCheck, RefreshCcw } from "lucide-react";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = async () => {
    setRefreshing(true);
    try {
      const res = await api.get("/status");
      setStatus(res.data.data);
    } catch (err) {
      console.error("Health check failed");
    } finally {
      setTimeout(() => setRefreshing(false), 600);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
        <RefreshCcw className="w-8 h-8 animate-spin text-brand-green" />
        <p className="font-mono text-xs uppercase tracking-widest">Initalizing System Health Check...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-10"
    >
      <div className="flex items-end justify-between border-b border-border-dark pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-green mb-2">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Network Security Active</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">System Health</h1>
        </div>
        <button 
          onClick={fetchStatus}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <RefreshCcw size={14} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "SYNCING..." : "REFRESH"}
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusBadge label="Primary Server" value={status.server} />
        <StatusBadge label="Database Cluster" value={status.database} />
        <StatusBadge label="Gemini AI Engine" value={status.gemini} />
        <StatusBadge label="Cloudinary Assets" value={status.cloudinary} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Activity size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Real-time Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-slate-400">
                  <Cpu size={14} />
                  <span className="text-xs font-medium uppercase tracking-wider">Memory Allocation</span>
                </div>
                <span className="text-2xl font-mono font-bold text-white">{status.memoryUsageMB} <span className="text-xs text-slate-500">MB</span></span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((status.memoryUsageMB / 1024) * 100, 100)}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-brand-green shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                />
              </div>
              <p className="text-[10px] text-slate-500 italic">Optimized for high-concurrency CSV processing.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={14} />
                  <span className="text-xs font-medium uppercase tracking-wider">System Uptime</span>
                </div>
                <span className="text-xl font-mono font-bold text-brand-green">{formatUptime(status.uptimeSeconds)}</span>
              </div>
              <div className="flex gap-1">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`h-8 flex-1 rounded-sm ${i > 20 ? 'bg-brand-green/20' : 'bg-brand-green'} opacity-80`} />
                ))}
              </div>
              <p className="text-[10px] text-slate-500">Continuous operation since last deployment.</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-brand-green/5 to-transparent border-brand-green/10">
          <h3 className="text-sm font-bold text-brand-green uppercase tracking-widest mb-4">Instance Info</h3>
          <div className="space-y-4">
            <div className="pb-3 border-b border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Region</p>
              <p className="text-sm text-white font-medium">Asia South (Mumbai)</p>
            </div>
            <div className="pb-3 border-b border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Node Version</p>
              <p className="text-sm text-white font-medium italic">v20.11.0 LTS</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Environment</p>
              <p className="text-sm text-white font-medium">Production Cloud</p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}