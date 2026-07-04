"use client";

import { Customer } from "./customerListContainer";
import { X, Phone, MapPin, Calendar, DollarSign, Briefcase, Edit2 } from "lucide-react";

interface CustomerDetailSidebarProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
}

export default function CustomerDetailSidebar({ customer, isOpen, onClose, onEditClick }: CustomerDetailSidebarProps) {
  if (!isOpen || !customer) return null;

  return (
    <div className="w-full lg:w-[380px] bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-left-4">
      
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <h3 className="text-sm font-bold text-slate-800">پروفایل و سوابق مشتری</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-lg transition text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
        
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100/80 text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-2 font-bold text-base">
            {customer.name.charAt(0)}
          </div>
          <h4 className="font-bold text-slate-800 text-sm">{customer.name}</h4>
          <span className="text-[10px] text-slate-400 inline-block mt-0.5">شناسه: #{customer.id}</span>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">اطلاعات تماس و کارگاه</h5>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="dir-ltr text-right w-full">{customer.phone}</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
            <span className="leading-relaxed">{customer.address}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">خلاصه وضعیت مالی</h5>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-lg">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 block">کل سفارشات</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">{customer.totalOrders} فاکتور</span>
            </div>
            <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-lg">
              <DollarSign className="w-3.5 h-3.5 text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 block">مجموع خرید</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">
                {new Intl.NumberFormat("fa-IR").format(customer.totalSpent)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs p-2.5 bg-slate-50/50 border border-slate-100 rounded-lg">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>آخرین فاکتور</span>
            </div>
            <span className="font-semibold text-slate-700">{customer.lastOrderDate}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <button 
          onClick={onEditClick}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition shadow-sm"
        >
          <Edit2 className="w-3.5 h-3.5" />
          ویرایش اطلاعات مشتری
        </button>
      </div>
    </div>
  );
}