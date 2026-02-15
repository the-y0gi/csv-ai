"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  ChevronRight, 
  Menu, 
  X, 
  LayoutDashboard, 
  FileText, 
  Activity,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Status", href: "/status", icon: Activity },
];

export default function Topbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pageName = pathname === "/" 
    ? "Overview" 
    : pathname.split("/")[1].charAt(0).toUpperCase() + pathname.split("/")[1].slice(1);

  return (
    <>
      <header className="sticky top-0 z-50 h-20 bg-[#0f1115]/80 backdrop-blur-md border-b border-border-dark flex items-center px-6 md:px-8 justify-between">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm font-medium">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Workspace</span>
              <ChevronRight size={14} className="text-slate-700" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {pageName}
              {pathname === "/" && (
                <span className="px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold border border-brand-green/20">
                  LIVE
                </span>
              )}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">Admin User</p>
            <p className="text-[10px] text-brand-green font-medium mt-1 uppercase tracking-wider">Premium Plan</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-green to-emerald-600 p-[2px] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <div className="w-full h-full rounded-[10px] bg-[#0f1115] flex items-center justify-center overflow-hidden">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden bg-[#0d0f12] border-b border-border-dark p-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-2">Navigation</p>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      isActive ? "bg-brand-green/10 text-brand-green" : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              )}
            </nav>
            
            <div className="mt-6 pt-6 border-t border-border-dark">
              <div className="flex items-center gap-3 px-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
                  <Database size={16} className="text-black" />
                </div>
                <span className="font-bold text-white tracking-tight">CSV.AI PRO</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}