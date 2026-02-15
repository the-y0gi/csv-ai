"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Activity, 
  ChevronRight,
  Database
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Status", href: "/status", icon: Activity },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-[#0d0f12] border-r border-border-dark p-6 hidden md:flex flex-col h-screen sticky top-0 overflow-hidden">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <Database size={22} className="text-black" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight italic">
          CSV<span className="text-brand-green">.</span>AI
        </h1>
      </div>

      <nav className="flex-1 space-y-2 relative">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-4">
          Main Menu
        </p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative block">
              <div className={`
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
                ${isActive 
                  ? "bg-brand-green/10 text-brand-green shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"}
              `}>
                <div className="flex items-center gap-3">
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`font-medium tracking-wide ${isActive ? "text-white" : ""}`}>
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <motion.div layoutId="activeChevron">
                    <ChevronRight size={14} className="text-brand-green" />
                  </motion.div>
                )}
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-green rounded-r-full shadow-[2px_0_12px_#10b981]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border-dark/50 pt-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-green/10 via-transparent to-transparent border border-brand-green/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs font-bold text-brand-green mb-1 tracking-wider uppercase">Pro Plan</p>
          <p className="text-[10px] text-slate-400 leading-tight">Unlimited CSV uploads and AI insights.</p>
        </div>
      </div>
    </aside>
  );
}