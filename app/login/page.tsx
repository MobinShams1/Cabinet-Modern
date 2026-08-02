import LoginForm from "@/components/auth/login-Form";
import { Metadata } from "next";
export const metadata :Metadata = {
  title: "ورود به سامانه",
  description: "ورود اعضا و پرسنل کارگاه به پنل مدیریت",
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
