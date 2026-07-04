"use client";

import { Order } from "@/types/order";
import StatusBadge from "./statusBadge";
import { Eye, Edit, Trash2, Package } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  selectedOrderId?: string;
  onSelectOrder: (order: Order) => void;
  onDeleteOrder: (rawId: number) => void;
  onEditOrder: (order: Order) => void;
}

export default function OrderTable({ 
  orders, 
  selectedOrderId, 
  onSelectOrder, 
  onDeleteOrder,
  onEditOrder 
}: OrderTableProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-right border-b border-slate-100 bg-slate-50">
              <th className="p-4 text-sm font-semibold text-slate-600">شماره سفارش</th>
              <th className="p-4 text-sm font-semibold text-slate-600">مشتری</th>
              <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">شماره تماس</th>
              <th className="p-4 text-sm font-semibold text-slate-600">مبلغ</th>
              <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">تاریخ</th>
              <th className="p-4 text-sm font-semibold text-slate-600">وضعیت</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className={`border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${
                  selectedOrderId === order.id ? 'bg-indigo-50/60' : ''
                }`}
              >
                <td className="p-4 text-sm font-medium text-indigo-600">{order.id}</td>
                <td className="p-4 text-sm text-slate-800">{order.customerName}</td>
                <td className="p-4 text-sm text-slate-600 hidden md:table-cell">{order.customerPhone}</td>
                <td className="p-4 text-sm font-medium text-slate-800">{formatPrice(order.totalPrice)} تومان</td>
                <td className="p-4 text-sm text-slate-500 hidden lg:table-cell">{order.date}</td>
                <td className="p-4"><StatusBadge status={order.status} /></td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onSelectOrder(order)} 
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => onEditOrder(order)} 
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => onDeleteOrder(order.rawId)} 
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p>هیچ سفارشی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
}