import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CSV.AI | Premium Insights Dashboard",
    template: "%s | CSV.AI"
  },
  description: "AI-powered CSV analytics dashboard for deep data intelligence and automated insights.",
  keywords: ["CSV Analytics", "AI Dashboard", "Data Intelligence", "SaaS", "Next.js"],
  authors: [{ name: "Your Name/Brand" }],
  
  openGraph: {
    title: "CSV.AI - Premium Data Insights",
    description: "Transform your raw CSV data into actionable AI intelligence.",
    url: "https://your-dashboard-link.com",
    siteName: "CSV.AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CSV.AI Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CSV.AI | AI-Powered Data Analytics",
    description: "Smartest way to analyze CSV files using Gemini AI.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark premium-scrollbar"> {/* Scrollbar fix class yahan bhi add kar di */}
      <body className="flex min-h-screen bg-[#0f1115] text-slate-100 antialiased overflow-x-hidden">
        
        <Sidebar />

        <div className="flex-1 flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-green/5 to-transparent pointer-events-none" />
          
          <Topbar />
          
          <main className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full relative z-10">
            {children}
          </main>
        </div>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}