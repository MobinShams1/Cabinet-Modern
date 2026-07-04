"use client";

import { Customer } from "./customerListContainer";
import { X, Phone, MapPin, Calendar, DollarSign, Briefcase, Edit2 } from "lucide-react";

interface CustomerDetailSidebarProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
}

export default function CustomerDetailSidebar({ customer, isOpen, onClose,onEditClick }: CustomerDetailSidebarProps) {
  if (!isOpen || !customer) return null;

  return (
    <div className="w-full lg:w-1/3 bg-white border-t lg:border-t-0 lg:border-r border-slate-200 overflow-y-auto h-[60vh] lg:h-auto fixed bottom-0 left-0 right-0 lg:relative lg:block z-20 shadow-2xl lg:shadow-none transition-all">
      {/* هدر سایدبار */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-800">پروفایل مشتری</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-3 font-bold text-lg">
            {customer.name.charAt(0)}
          </div>
          <h4 className="font-bold text-slate-800 text-base">{customer.name}</h4>
          <span className="text-xs text-slate-400 inline-block mt-1">شناسه سیستم: #{customer.id}</span>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">اطلاعات تماس</h5>
          <div className="flex items-center gap-3 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="dir-ltr text-right w-full">{customer.phone}</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
            <span className="leading-relaxed">{customer.address}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">خلاصه وضعیت مالی</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50/60 border border-slate-100 rounded-xl">
              <Briefcase className="w-4 h-4 text-slate-400 mb-1" />
              <span className="text-xs text-slate-500 block">کل سفارشات</span>
              <span className="text-sm font-bold text-slate-800 block mt-0.5">{customer.totalOrders} فاکتور</span>
            </div>
            <div className="p-3 bg-slate-50/60 border border-slate-100 rounded-xl">
              <DollarSign className="w-4 h-4 text-slate-400 mb-1" />
              <span className="text-xs text-slate-500 block">مجموع پرداخت</span>
              <span className="text-sm font-bold text-slate-800 block mt-0.5">
                {new Intl.NumberFormat("fa-IR").format(customer.totalSpent)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm p-3 bg-slate-50/60 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>آخرین فاکتور ثبت شده</span>
            </div>
            <span className="font-semibold text-slate-700">{customer.lastOrderDate}</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 sticky bottom-0 bg-white">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition shadow-sm" onClick={onEditClick}>
          <Edit2 className="w-4 h-4" />
          ویرایش اطلاعات مشتری
        </button>
      </div>
    </div>
  );
}