import ProfileContainer from "@/components/profile/profileContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل من",
  description: "مشاهده اطلاعات کاربری، نقش سیستم و به‌روزرسانی کلمه عبور"
};


export default function ProfilePage() {
  return <ProfileContainer />;
}
