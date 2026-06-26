import { supabase } from "@/lib/supabase/client";
import { UserData } from "@/types/user";

export async function getProfile(
  userId: string,
  email: string
): Promise<UserData | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return {
      id: userId,
      email,
      full_name: email.split("@")[0],
      role: "employee",
    };
  }

  return {
    id: userId,
    email,
    full_name: data.full_name,
    role: data.role,
  };
}