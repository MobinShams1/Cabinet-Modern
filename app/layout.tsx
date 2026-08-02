import "./globals.css";

import { UserProvider } from "../context/userContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import SessionManager from "@/components/sessionManager";
import { Viewport, Metadata } from "next";
import RegisterSW from "@/components/registerSW";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Cabinet ERP",
  description: "سامانه مدیریت کارگاه کابینت‌سازی",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cabinet ERP",
  },
  icons: {
    icon: [{ url: "/icon-logo1.png" }],
    shortcut: ["/icon-logo1.png"],
    apple: [{ url: "/icon-logo1.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", geist.variable)}>
      <body>
        <RegisterSW />
        <UserProvider>{children}</UserProvider>
        <Toaster
          position="top-center"
          dir="rtl"
          duration={3000}
          closeButton
          richColors
        />
        <SessionManager />
      </body>
    </html>
  );
}
