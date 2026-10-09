import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import InitSeed from "../components/InitSeed";
import BottomQuickDock from "../components/layout/BottomQuickDock";
import FloatingQuickCall from "../components/layout/FloatingQuickCall";
import ProgressBar from "../components/layout/ProgressBar";
import { AuthProvider } from "@/lib/auth/AuthContext";

export const metadata: Metadata = {
  title: "Nhựa Nguyên Thái Bình - Bao bì nhựa & Khuôn mẫu B2B",
  description: "Giải pháp bao bì nhựa PET, HDPE và khuôn mẫu theo yêu cầu cho doanh nghiệp. Sản xuất hàng loạt, tư vấn thiết kế riêng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body 
        className="flex flex-col min-h-screen font-sans antialiased selection:bg-ntb-blue/10 selection:text-ntb-blue"
        style={{ paddingBottom: 'calc(var(--bottom-dock-height) + var(--bottom-safe-area) + 16px)' }}
      >
        <div className="fixed inset-0 ntb-grid-bg opacity-[0.4] pointer-events-none z-[-1]" />
        <AuthProvider>
          <InitSeed />
          <ProgressBar />
          <Header />
          <main className="flex-grow pt-[56px] md:pt-[88px] relative z-0">
            {children}
          </main>
          <Footer />
          <BottomQuickDock />
          <FloatingQuickCall />
        </AuthProvider>
      </body>
    </html>
  );
}
