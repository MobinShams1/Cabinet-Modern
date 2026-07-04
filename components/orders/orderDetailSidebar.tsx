// app/dashboard/orders/_components/OrderDetailSidebar.tsx
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
    <div className="w-full lg:w-1/3 bg-white border-t lg:border-t-0 lg:border-r border-slate-200 overflow-y-auto h-[50vh] lg:h-auto fixed bottom-0 left-0 right-0 lg:relative lg:block z-20 shadow-xl lg:shadow-none">
      
      <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
        <h3 className="text-lg font-bold text-slate-800">جزئیات سفارش</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="p-6 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">مشخصات مشتری</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <User className="w-4 h-4 text-slate-400" />
            <span>{order.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="dir-ltr inline-block">{order.customerPhone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-700">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
            <span>{order.customerAddress}</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">جزئیات سفارش</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">شماره سفارش</span>
            <span className="font-medium text-slate-800">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">تاریخ ثبت</span>
            <span className="font-medium text-slate-800">{order.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">وضعیت</span>
            <StatusBadge status={order.status} />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">مبلغ کل</span>
            <span className="font-bold text-slate-800">{formatPrice(order.totalPrice)} تومان</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">محصولات سفارش</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex-1">
                <p className="text-sm text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">تعداد: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium text-slate-700">
                {formatPrice(item.price)} تومان
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 grid grid-cols-2 gap-3 sticky bottom-0 bg-white">
        <button 
          onClick={onEditClick} 
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm shadow-indigo-200"
        >
          <Edit className="w-4 h-4" />
          <span className="text-sm font-medium">ویرایش</span>
        </button>
        <button 
          onClick={onDeleteClick} 
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm font-medium">حذف</span>
        </button>
      </div>
    </div>
  );
}