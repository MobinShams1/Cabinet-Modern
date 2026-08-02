import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import AdminLayoutClient from "@/components/lauout/adminLayoutClient";

export const metadata: Metadata = {
  title: {
    template: "%s | سامانه Cabinet ERP",
    default: "داشبورد مدیریت | Cabinet ERP",
  },
  icons: {
    icon: [{ url: "/icon-logo1.png" }],
    shortcut: ["/logo.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}