"use client";

import { useState } from "react";
import { Order } from "@/types/order";
import OrderHeader from "./orderHeader";
import OrderFilters from "./orderFilters";
import OrderTable from "./orderTable";
import OrderDetailSidebar from "./orderDetailSidebar";
import NewOrderModal from "@/app/admin/orders/@modal/(.)new/page";
import { deleteOrder } from "@/actions/ordersAction";
import { createBrowserClient } from "@supabase/ssr";


interface OrderListContainerProps {
  initialOrders: Order[];
}

export default function OrderListContainer({ initialOrders }: OrderListContainerProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  
  const handleOrderAdded = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // ب) ویرایش و بروزرسانی آنی مشخصات و اقلام سفارش در لیست و سایدبار
  const handleOrderUpdated = (updatedOrder: Order) => {
    setOrders((prev) => prev.map((o) => (o.rawId === updatedOrder.rawId ? updatedOrder : o)));
    if (selectedOrder?.rawId === updatedOrder.rawId) {
      setSelectedOrder(updatedOrder);
    }
  };

  const handleOrderDeleted = async (rawId: number) => {
    if (!confirm("آیا از حذف این سفارش کابینت مطمئن هستید؟ این عمل غیرقابل بازگشت است.")) return;

    const result = await deleteOrder(rawId);
    if (result.success) {
      setOrders((prev) => prev.filter((o) => o.rawId !== rawId));
      if (selectedOrder?.rawId === rawId) {
        setIsDetailOpen(false);
        setSelectedOrder(null);
      }
    } else {
      alert(`خطا در حذف سفارش: ${result.error}`);
    }
  };

  const handleEditOrderClick = async (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);

    if (!order.items || order.items.length === 0) {
      const { data: itemsData, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.rawId);

      if (error) {
        console.error("خطا در دریافت اقلام فاکتور برای ویرایش:", error.message);
        return;
      }

      if (itemsData) {
        const fullOrderDetails = {
          ...order,
          items: itemsData.map((item: any) => ({
            id: item.id.toString(),
            name: item.description,
            quantity: item.quantity,
            price: Number(item.unit_price),
          })),
        };
        setSelectedOrder(fullOrderDetails);
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectOrder = async (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);

    if (!order.items || order.items.length === 0) {
      const { data: itemsData } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.rawId);

      if (itemsData) {
        setSelectedOrder((prev) =>
          prev && prev.rawId === order.rawId
            ? {
                ...prev,
                items: itemsData.map((item: any) => ({
                  id: item.id.toString(),
                  name: item.description,
                  quantity: item.quantity,
                  price: Number(item.unit_price),
                })),
              }
            : prev
        );
      }
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className={`flex-1 flex flex-col ${isDetailOpen && selectedOrder ? "lg:w-2/3" : "w-full"} transition-all duration-300`}>
        <OrderHeader onNewOrderClick={() => setIsNewModalOpen(true)} />

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
          onDeleteOrder={handleOrderDeleted}
          onEditOrder={handleEditOrderClick} 
        />
      </div>

      <OrderDetailSidebar
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEditClick={() => handleEditOrderClick(selectedOrder!)} 
        onDeleteClick={() => handleOrderDeleted(selectedOrder!.rawId)}
      />

      <NewOrderModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onOrderAdded={handleOrderAdded}
      />

      <NewOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editOrderData={selectedOrder}
        onOrderUpdated={handleOrderUpdated}
      />
    </div>
  );
}