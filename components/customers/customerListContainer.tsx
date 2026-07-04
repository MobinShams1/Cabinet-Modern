// app/dashboard/customers/_components/CustomerListContainer.tsx
"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import CustomerTable from "./customerTable";
import CustomerDetailSidebar from "./customerDetailsSidebar";
import EditCustomerModal from "./editCustomerModal";

export interface Customer {
  id: string;
  rawId: number;
  name: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "subdued" | "debtor";
  lastOrderDate: string;
}

interface CustomerListContainerProps {
  initialCustomers: Customer[];
}

export default function CustomerListContainer({ initialCustomers }: CustomerListContainerProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // منطق فیلتر و جستجوی مشتریان
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCustomerUpdated = (updatedCustomer: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.rawId === updatedCustomer.rawId ? updatedCustomer : c)));
    setSelectedCustomer(updatedCustomer); 
  };

  return (
    <div className="h-full bg-slate-50/50 flex flex-col p-6">
      
      {/* هدر صفحه مشتریان */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">مدیریت مشتریان</h1>
        <p className="text-xs text-slate-500 mt-1">لیست خریداران، تاریخچه سفارشات کابینت و وضعیت حساب‌ها</p>
      </div>

      {/* نوار فیلتر و جستجو (کاملاً بازنویسی و بازگردانده شد) */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی نام مشتری یا شماره تماس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[160px]">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-700"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="active">مشتریان فعال</option>
            <option value="debtor">بدهکاران</option>
            <option value="subdued">کم‌کار / بایگانی</option>
          </select>
        </div>
      </div>

      {/* چیدمان موازی و هم‌راستای جدول و سایدبار */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch flex-1">
        
        {/* ستون سمت راست: جدول اصلی مشتریان */}
        <div className="flex-1 transition-all duration-300 min-w-0">
          <CustomerTable 
            customers={filteredCustomers} 
            selectedCustomerId={selectedCustomer?.id}
            onSelectCustomer={(c) => {
              setSelectedCustomer(c);
              setIsDetailOpen(true);
            }}
          />
        </div>

        {/* ستون سمت چپ: سایدبار جزئیات متناسب با قد جدول */}
        <CustomerDetailSidebar 
          customer={selectedCustomer}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onEditClick={() => setIsEditModalOpen(true)}
        />
      </div>

      {/* مدال ویرایش اطلاعات مشتری */}
      <EditCustomerModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        customer={selectedCustomer} 
        onCustomerUpdated={handleCustomerUpdated} 
      />
    </div>
  );
}