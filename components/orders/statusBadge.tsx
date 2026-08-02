"use client";

import { Order } from "@/types/order";
import { CheckCircle, Clock, AlertCircle, Truck, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: Order["status"];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    completed: {
      label: "تکمیل شده",
      className: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    "in-progress": {
      label: "در حال انجام",
      className: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    pending: {
      label: "در انتظار",
      className: "bg-orange-100 text-orange-700",
      icon: AlertCircle,
    },
    designing: {
      label: "در حال طراحی",
      className: "bg-blue-100 text-blue-700",
      icon: Truck,
    },
    cancelled: {
      label: "لغو شده",
      className: "bg-red-100 text-red-700",
      icon: XCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 md:gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[11px] md:text-xs font-medium whitespace-nowrap ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}