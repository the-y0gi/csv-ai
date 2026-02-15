"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { UploadCloud, Loader2 } from "lucide-react"; 

export default function UploadSection({
  onUploadComplete,
}: {
  onUploadComplete: (data: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/upload", formData);
      onUploadComplete(res.data.data);
      toast.success("File analyzed successfully!");
    } catch (err) {
      toast.error("Upload failed. Please check your CSV format.");
    } finally {
      setLoading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop,
    multiple: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div
        {...getRootProps()}
        className={`
          relative group cursor-pointer overflow-hidden
          rounded-3xl border-2 border-dashed transition-all duration-500
          ${isDragActive 
            ? "border-brand-green bg-brand-green/5 shadow-[0_0_40px_rgba(16,185,129,0.1)]" 
            : "border-border-dark bg-card-dark hover:border-brand-green/50"}
          p-12 text-center
        `}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <input {...getInputProps()} />

        <div className="relative z-10 flex flex-col items-center gap-4">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-brand-green animate-spin" />
              <div className="space-y-1">
                <p className="text-xl font-semibold text-white tracking-tight">Crunching Data...</p>
                <p className="text-sm text-slate-400">Our AI is extracting insights from your CSV</p>
              </div>
            </div>
          ) : (
            <>
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
                ${isDragActive ? "bg-brand-green text-black scale-110" : "bg-brand-green/10 text-brand-green"}
              `}>
                <UploadCloud className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {isDragActive ? "Drop it here" : "Upload CSV Data"}
                </h3>
                <p className="text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Drag and drop your spreadsheet or click to browse. 
                  <span className="text-brand-green/80 font-medium"> Premium analysis</span> starts here.
                </p>
              </div>

              <div className="mt-4 px-4 py-2 rounded-full border border-border-dark bg-white/5 text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                Supported format: .CSV only
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}