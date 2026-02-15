"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { BarChart3, Info } from "lucide-react";

export default function ChartsSection({ metadata }: { metadata: any }) {
  const numericColumns = Object.entries(metadata.columnStats || {})
    .filter(([_, val]: any) => val.type === "number")
    .map(([key, val]: any) => ({
      name: key,
      avg: val.avg || 0,
    }));

  if (numericColumns.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-green/10 rounded-xl border border-brand-green/20">
            <BarChart3 className="text-brand-green w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Data Distribution</h2>
            <p className="text-xs text-slate-500 font-medium">Average metrics across numerical attributes</p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
          <Info size={18} />
        </button>
      </div>

      <div className="h-[400px] w-full bg-[#0d0f12] rounded-2xl border border-border-dark p-6 relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[60px] font-bold select-none pointer-events-none">
          STATS
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={numericColumns} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#22272e" 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />

            <Tooltip
              cursor={{ fill: 'rgba(45, 212, 191, 0.05)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#161a1f] border border-brand-green/30 backdrop-blur-xl p-3 rounded-lg shadow-2xl">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Attribute</p>
                      <p className="text-white font-bold mb-2">{payload[0].payload.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_8px_#10b981]" />
                        <p className="text-brand-green font-mono text-lg font-bold">
                          {payload[0].value?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar 
              dataKey="avg" 
              radius={[6, 6, 0, 0]} 
              barSize={45}
            >
              {numericColumns.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill="url(#barGradient)" 
                  className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                />
              ))}
            </Bar>

            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}