// app/dashboard/orders/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronDown,
  User,
  Phone,
  MapPin,
  Package,
  Eye,
  Edit,
  Trash2,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Truck,
} from "lucide-react";

// انواع داده
interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending' | 'designing';
  totalPrice: number;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// داده‌های نمونه
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "رضا محمدی",
    customerPhone: "0912 123 4567",
    customerAddress: "تهران، شهرک غرب، فاز 2، پلاک 12",
    date: "1405/04/15",
    status: "completed",
    totalPrice: 25000000,
    items: [
      { id: "1", name: "کابینت آشپزخانه مدل مدرن", quantity: 1, price: 15000000 },
      { id: "2", name: "کابینت جزیره", quantity: 1, price: 10000000 }
    ]
  },
  {
    id: "ORD-002",
    customerName: "سارا احمدی",
    customerPhone: "0912 987 6543",
    customerAddress: "اصفهان، خیابان چهارباغ، کوچه ۵",
    date: "1405/04/20",
    status: "in-progress",
    totalPrice: 18000000,
    items: [
      { id: "3", name: "کابینت کلاسیک", quantity: 1, price: 18000000 }
    ]
  },
  {
    id: "ORD-003",
    customerName: "علی کریمی",
    customerPhone: "0912 456 7890",
    customerAddress: "شیراز، بلوار کریمخان، پلاک ۴۵",
    date: "1405/04/25",
    status: "pending",
    totalPrice: 32000000,
    items: [
      { id: "4", name: "کابینت مدرن با جزیره", quantity: 1, price: 22000000 },
      { id: "5", name: "کابینت دیواری", quantity: 2, price: 5000000 }
    ]
  },
  {
    id: "ORD-004",
    customerName: "مریم حسینی",
    customerPhone: "0912 789 0123",
    customerAddress: "مشهد، خیابان امام رضا، پلاک ۷",
    date: "1405/04/30",
    status: "designing",
    totalPrice: 15000000,
    items: [
      { id: "6", name: "کابینت مینیمال", quantity: 1, price: 15000000 }
    ]
  }
];

// کامپوننت وضعیت
function StatusBadge({ status }: { status: Order['status'] }) {
  const statusConfig = {
    completed: {
      label: "تکمیل شده",
      className: "bg-green-100 text-green-700",
      icon: CheckCircle
    },
    "in-progress": {
      label: "در حال انجام",
      className: "bg-yellow-100 text-yellow-700",
      icon: Clock
    },
    pending: {
      label: "در انتظار",
      className: "bg-orange-100 text-orange-700",
      icon: AlertCircle
    },
    designing: {
      label: "در حال طراحی",
      className: "bg-blue-100 text-blue-700",
      icon: Truck
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

// کامپوننت اصلی صفحه
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // فیلتر کردن سفارشات
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.includes(searchQuery) || 
                          order.id.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // فرمت قیمت
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="h-full flex">
      {/* ============ لیست سفارشات ============ */}
      <div className={`flex-1 ${isDetailOpen ? 'lg:w-2/3' : 'w-full'} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">سفارشات</h1>
              <p className="text-sm text-slate-500">مدیریت و پیگیری سفارشات مشتریان</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm shadow-indigo-200">
                <Plus className="w-4 h-4" />
                <Link href="/admin/orders/new" className="text-sm font-medium">سفارش جدید</Link>
              </button>
            </div>
          </div>
        </div>

        {/* فیلتر و جستجو */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس شماره سفارش یا نام مشتری..."
              className="w-full border border-slate-300 rounded-lg pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none border border-slate-300 rounded-lg px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white cursor-pointer"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="completed">تکمیل شده</option>
                <option value="in-progress">در حال انجام</option>
                <option value="pending">در انتظار</option>
                <option value="designing">در حال طراحی</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>

            <button 
              onClick={() => setIsDetailOpen(!isDetailOpen)}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition lg:hidden"
            >
              <Eye className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* جدول سفارشات */}
        <div className="overflow-x-auto p-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-right border-b border-slate-100 bg-slate-50">
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap">شماره سفارش</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap">مشتری</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap hidden md:table-cell">شماره تماس</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap">مبلغ</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap hidden lg:table-cell">تاریخ</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap">وضعیت</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 whitespace-nowrap text-center">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${
                      selectedOrder?.id === order.id ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <td className="p-4 text-sm font-medium text-indigo-600 whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="p-4 text-sm text-slate-800 whitespace-nowrap">
                      {order.customerName}
                    </td>
                    <td className="p-4 text-sm text-slate-600 whitespace-nowrap hidden md:table-cell">
                      {order.customerPhone}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-800 whitespace-nowrap">
                      {formatPrice(order.totalPrice)} تومان
                    </td>
                    <td className="p-4 text-sm text-slate-500 whitespace-nowrap hidden lg:table-cell">
                      {order.date}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p>هیچ سفارشی یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============ جزئیات سفارش ============ */}
      {isDetailOpen && selectedOrder && (
        <div className="lg:w-1/3 bg-white border-r border-slate-200 overflow-y-auto">
          {/* هدر جزئیات */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">جزئیات سفارش</h3>
            <button 
              onClick={() => setIsDetailOpen(false)}
              className="lg:hidden p-1 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* اطلاعات مشتری */}
          <div className="p-6 border-b border-slate-200">
            <h4 className="text-sm font-semibold text-slate-600 mb-3">مشخصات مشتری</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <User className="w-4 h-4 text-slate-400" />
                <span>{selectedOrder.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>{selectedOrder.customerAddress}</span>
              </div>
            </div>
          </div>

          {/* جزئیات سفارش */}
          <div className="p-6 border-b border-slate-200">
            <h4 className="text-sm font-semibold text-slate-600 mb-3">جزئیات سفارش</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">شماره سفارش</span>
                <span className="font-medium text-slate-800">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">تاریخ ثبت</span>
                <span className="font-medium text-slate-800">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">وضعیت</span>
                <StatusBadge status={selectedOrder.status} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">مبلغ کل</span>
                <span className="font-bold text-slate-800">{formatPrice(selectedOrder.totalPrice)} تومان</span>
              </div>
            </div>
          </div>

          {/* لیست محصولات */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-slate-600 mb-3">محصولات سفارش</h4>
            <div className="space-y-2">
              {selectedOrder.items.map((item) => (
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

          {/* دکمه‌های اقدام */}
          <div className="p-6 border-t border-slate-200 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm shadow-indigo-200">
              <Edit className="w-4 h-4" />
              <span className="text-sm font-medium">ویرایش</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">حذف</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}