"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
interface MenuLinkProps {
  id: string;
  href: string;
  label: string;
  icon: ReactNode;
  isSidebarOpen: boolean;
  onClick?: () => void;
}

export default function MenuLink({
  id,
  href,
  label,
  icon,
  isSidebarOpen,
  onClick,
}: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <>
      <Link
        key={id}
        href={href}
        onClick={onClick}
        className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                  ${!isSidebarOpen && "justify-center"}
                `}
        title={!isSidebarOpen ? label : ""}
      >
        <span
          className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-500"}`}
        >
          {icon}
        </span>
        {isSidebarOpen && (
          <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        )}
      </Link>
    </>
  );
}
