"use client";

import { useState, useEffect } from "react";
import { User, Loader2, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

import PersonalInfoForm from "./personalInfoForm";
import SecurityForm from "./securityForm";

export default function ProfileContainer() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const [securityForm, setSecurityForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) return;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        setUserForm({
          fullName: profile?.full_name || "",
          email: user.email || "",
          role: profile?.role || "employee",
        });

      } catch (error: any) {
        console.error("Fetch profile error:", error);
        toast.error("خطا در بارگذاری اطلاعات پروفایل");
      } finally {
        setFetching(false);
      }
    }

    fetchUserProfile();
  }, []);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityForm({ ...securityForm, [e.target.name]: e.target.value });
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: userForm.fullName })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("اطلاعات فردی با موفقیت بروزرسانی شد.");
    } catch (error: any) {
      toast.error("خطا در ذخیره اطلاعات.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error("رمز عبور جدید و تکرار آن با هم مطابقت ندارند.");
      return;
    }
    if (securityForm.newPassword.length < 6) {
      toast.error("رمز عبور جدید باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: securityForm.newPassword
      });

      if (error) throw error;
      toast.success("رمز عبور شما با موفقیت تغییر کرد.");
      setSecurityForm({ newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(`خطا در تغییر رمز عبور: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-50/50 p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
          {userForm.fullName ? userForm.fullName[0] : <User className="w-5 h-5" />}
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">پروفایل کاربری من</h1>
          <div className="flex items-center gap-1 mt-0.5 text-slate-500 text-xs">
            <BadgeCheck className="w-3.5 h-3.5 text-indigo-500" />
            <span>نقش دسترسی: {userForm.role === "admin" ? "مدیر سیستم" : "کارکنان کارگاه"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PersonalInfoForm 
          formData={userForm} 
          loading={loading} 
          onChange={handleUserChange} 
          onSubmit={handleUpdateInfo} 
        />
        <SecurityForm 
          formData={securityForm} 
          loading={loading} 
          onChange={handleSecurityChange} 
          onSubmit={handleChangePassword} 
        />
      </div>
    </div>
  );
}