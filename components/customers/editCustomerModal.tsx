// app/dashboard/customers/_components/EditCustomerModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, Loader2 } from "lucide-react";
import { updateCustomer } from "@/actions/customersAction";
import { Customer } from "./customerListContainer";

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  onCustomerUpdated: (updatedCustomer: Customer) => void;
}

export default function EditCustomerModal({ isOpen, onClose, customer, onCustomerUpdated }: EditCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // پر کردن فرم به محض انتخاب مشتری
  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setPhone(customer.phone);
      address: setAddress(customer.address || "");
    }
  }, [customer, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    setIsSubmitting(true);
    const result = await updateCustomer({ rawId: customer.rawId, name, phone, address });
    setIsSubmitting(false);

    if (result.success) {
      onCustomerUpdated({
        ...customer,
        name,
        phone,
        address,
      });
      onClose();
    } else {
      alert(`خطا در ویرایش مشتری: ${result.error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold text-slate-800">ویرایش پروفایل مشتری</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">نام و نام خانوادگی</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">شماره تماس</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition text-left dir-ltr"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">آدرس</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}