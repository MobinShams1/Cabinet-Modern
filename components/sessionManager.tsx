"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SessionManager() {
  useEffect(() => {
    const handleUnload = () => {
      supabase.auth.signOut();
    };

    window.addEventListener("pagehide", handleUnload);

    return () => {
      window.removeEventListener("pagehide", handleUnload);
    };
  }, []);

  return null;
}