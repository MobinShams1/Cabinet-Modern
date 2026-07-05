import "./globals.css";

import { UserProvider } from "../context/userContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <UserProvider>{children}</UserProvider>
        <Toaster position="top-center" dir="rtl" duration={3000} closeButton richColors />
      </body>
    </html>
  );
}
