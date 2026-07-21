import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Sidebar from "@/components/sidebar/sidebarForAdmin";
import Header from "@/components/dashboard/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | سامانه Cabinet ERP",
    default: "داشبورد مدیریت | Cabinet ERP",
  },
  description: "سامانه یکپارچه مدیریت کارگاه، انبارداری و تولید کابینت",
  robots: {
    index: false, 
    follow: false,
  },
};


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  if (profile.role !== "admin") {
    redirect("/employee/dashboard");
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
          
        </main>
      </div>
    </div>
  );
}