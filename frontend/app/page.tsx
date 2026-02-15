"use client";

import { useState } from "react";
import UploadSection from "@/components/upload/UploadSection";
import SummaryCards from "@/components/dashboard/SummaryCards";
import InsightsSection from "@/components/insights/InsightsSection";
import ChartsSection from "@/components/charts/ChartsSection";
import FollowUpSection from "@/components/followup/FollowUpSection";
import { motion, AnimatePresence } from "framer-motion"; // Animations ke liye

export default function Home() {
  const [reportData, setReportData] = useState<any>(null);

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
      <section className="relative z-20">
        <UploadSection onUploadComplete={setReportData} />
      </section>

      <AnimatePresence>
        {reportData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-12">
              <SummaryCards metadata={reportData} />
            </div>
            <div className="md:col-span-8 h-full">
              <div className="premium-card h-full">
                <InsightsSection insights={reportData.insights} />
              </div>
            </div>

            <div className="md:col-span-4 h-full">
              <div className="premium-card h-full bg-gradient-to-br from-[#161a1f] to-[#1a2027]">
                <FollowUpSection reportId={reportData._id} />
              </div>
            </div>

            <div className="md:col-span-12">
              <div className="premium-card bg-[#0f1115]/50 backdrop-blur-md">
                <ChartsSection metadata={reportData} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}