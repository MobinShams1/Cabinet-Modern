"use client";

import { Plus } from "lucide-react";
import NewOrderModal from "@/app/admin/orders/@modal/(.)new/page";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">سفارشات</h1>
          <p className="text-sm text-slate-500">
            مدیریت و پیگیری سفارشات مشتریان کابینت
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm shadow-indigo-200 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            سفارش جدید
          </button>
          <NewOrderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmitSuccess={() => {
              toast.success("سفارش با موفقیت ثبت شد.");
            }}
          />
        </div>
      </div>
    </div>
  );
}
