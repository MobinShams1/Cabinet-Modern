// app/dashboard/orders/_components/OrderListContainer.tsx
"use client";

import { useState } from "react";
import { Order } from "@/types/order";
import OrderHeader from "./orderHeader";
import OrderFilters from "./orderFilters";
import OrderTable from "./orderTable";
import OrderDetailSidebar from "./orderDetailSidebar";

interface OrderListContainerProps {
  initialOrders: Order[];
}

export default function OrderListContainer({ initialOrders }: OrderListContainerProps) {
  const [orders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // منطق فیلتر کردن سفارشات
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.includes(searchQuery) || order.id.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* سمت راست: بخش لیست و فیلترها */}
      <div className={`flex-1 flex flex-col ${isDetailOpen && selectedOrder ? 'lg:w-2/3' : 'w-full'} transition-all duration-300`}>
        <OrderHeader />
        
        <OrderFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <OrderTable 
          orders={filteredOrders}
          selectedOrderId={selectedOrder?.id}
          onSelectOrder={handleSelectOrder}
        />
      </div>

      {/* سمت چپ: نمایش سایدبار جزئیات */}
      <OrderDetailSidebar 
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}