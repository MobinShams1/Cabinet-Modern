"use client";

import { Order } from "@/types/order";
import StatusBadge from "./statusBadge";
import { User, Phone, MapPin, X, Edit, Trash2 } from "lucide-react";

interface OrderDetailSidebarProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void; 
  onDeleteClick: () => void; 
}

export default function OrderDetailSidebar({ 
  order, 
  isOpen, 
  onClose,
  onEditClick,
  onDeleteClick 
}: OrderDetailSidebarProps) {
  
  if (!isOpen || !order) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <>
      {/* Backdrop لایه تاریک پشت صفحه برای موبایل و تبلت */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
      />

      <div className={`
        fixed inset-x-0 bottom-0 z-50 h-[85vh] rounded-t-2xl bg-white shadow-2xl
        lg:static lg:z-auto lg:h-auto lg:w-1/3 lg:rounded-none lg:border-r lg:border-slate-200 lg:shadow-none
        flex flex-col transition-all duration-300
      `}>
        
        {/* هدر کشو */}
        <div className="p-4 md:p-6 border-b border-slate-200 flex items-center justify-between bg-white rounded-t-2xl lg:rounded-none shrink-0">
          <h3 className="text-base md:text-lg font-bold text-slate-800">جزئیات سفارش</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* محتوای قابل اسکرول */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          <div className="p-4 md:p-6">
            <h4 className="text-xs md:text-sm font-semibold text-slate-600 mb-3">مشخصات مشتری</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-700">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-700">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="dir-ltr inline-block">{order.customerPhone}</span>
              </div>
              <div className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span>{order.customerAddress}</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <h4 className="text-xs md:text-sm font-semibold text-slate-600 mb-3">اطلاعات سفارش</h4>
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-slate-500">شماره سفارش</span>
                <span className="font-medium text-slate-800">#{order.id}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-slate-500">تاریخ ثبت</span>
                <span className="font-medium text-slate-800">{order.date}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm items-center">
                <span className="text-slate-500">وضعیت</span>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-slate-500">مبلغ کل</span>
                <span className="font-bold text-slate-800">{formatPrice(order.totalPrice)} تومان</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <h4 className="text-xs md:text-sm font-semibold text-slate-600 mb-3">محصولات سفارش</h4>
            <div className="space-y-2">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-slate-800 font-medium">{item.name}</p>
                    <p className="text-[11px] md:text-xs text-slate-500">تعداد: {item.quantity}</p>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-700 whitespace-nowrap">
                    {formatPrice(item.price)} تومان
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیات پایین */}
        <div className="p-4 border-t border-slate-200 grid grid-cols-2 gap-3 bg-white shrink-0">
          <button 
            onClick={onEditClick} 
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm text-xs md:text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            <span>ویرایش</span>
          </button>
          <button 
            onClick={onDeleteClick} 
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition text-xs md:text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>حذف</span>
          </button>
        </div>
      </div>
    </>
  );
}