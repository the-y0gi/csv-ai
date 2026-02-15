"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import SummaryCards from "@/components/dashboard/SummaryCards";
import InsightsSection from "@/components/insights/InsightsSection";
import ChartsSection from "@/components/charts/ChartsSection";
import FollowUpSection from "@/components/followup/FollowUpSection";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/${params.id}`);
        setReport(res.data.data);
      } catch (err) {
        console.error("Failed to fetch report");
      }
    };
    if (params.id) fetchReport();
  }, [params.id]);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${report.filename}_analysis.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("Report exported as JSON");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Report link copied to clipboard", {
       icon: <Share2 className="text-blue-400 w-4 h-4" />
    });
  };

  if (!report) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
        <p className="font-mono text-xs uppercase tracking-widest">Decrypting Report Data...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1400px] mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2.5 rounded-xl border border-border-dark bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={14} className="text-brand-green" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dataset Intelligence</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{report.filename}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-dark bg-white/5 text-sm font-bold text-slate-300 hover:text-white transition-all">
            <Share2 size={16} /> Share
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green text-black font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12">
          <SummaryCards metadata={report} />
        </div>
        <div className="md:col-span-8 space-y-6">
          <div className="premium-card min-h-[400px]">
            <InsightsSection insights={report.insights} />
          </div>
          <div className="premium-card">
            <ChartsSection metadata={report} />
          </div>
        </div>
        <div className="md:col-span-4 h-full">
          <div className="premium-card sticky top-24 h-fit border-brand-green/10 bg-gradient-to-b from-brand-green/[0.02] to-transparent">
            <FollowUpSection reportId={report._id} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}