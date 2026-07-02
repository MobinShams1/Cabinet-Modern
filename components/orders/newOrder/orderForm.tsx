// app/dashboard/orders/_components/OrderForm.tsx
"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import FormCustomerSection from "./formCustomerSection";
import FormTechnicalSection from "./formTechnicalSection";
import FormItemsSection, { FormItem } from "./formItemsSection";

interface OrderFormProps {
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export default function OrderForm({ onClose, onSubmitSuccess }: OrderFormProps) {
  // ایالت‌های بخش مشتری
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  
  // ایالت‌های بخش فنی
  const [cabinetType, setCabinetType] = useState("modern");
  const [materialType, setMaterialType] = useState("mdf");
  
  // ایالت‌های بخش اقلام فاکتور
  const [items, setItems] = useState<FormItem[]>([
    { name: "کابینت آشپزخانه", quantity: 1, price: 0 }
  ]);

  // توابع مدیریت اقلام داینامیک
  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: keyof FormItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      customerName,
      customerPhone,
      customerAddress,
      cabinetType,
      materialType,
      items,
      totalPrice: calculateTotal(),
      status: "pending",
      date: new Date().toLocaleDateString("fa-IR"),
    };

    console.log("آماده برای ارسال به Supabase:", formData);
    // نمونه کدهای بعدی Supabase در این قسمت قرار می‌گیرند.

    if (onSubmitSuccess) onSubmitSuccess();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto p-1">
      
      <FormCustomerSection 
        customerName={customerName} setCustomerName={setCustomerName}
        customerPhone={customerPhone} setCustomerPhone={setCustomerPhone}
        customerAddress={customerAddress} setCustomerAddress={setCustomerAddress}
      />

      <FormTechnicalSection 
        cabinetType={cabinetType} setCabinetType={setCabinetType}
        materialType={materialType} setMaterialType={setMaterialType}
      />

      <FormItemsSection 
        items={items}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onItemChange={handleItemChange}
      />

      {/* بخش نهایی و دکمه‌ها */}
      <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <span className="text-xs text-slate-500">مبلغ کل فاکتور: </span>
          <span className="text-lg font-bold text-slate-800">
            {new Intl.NumberFormat('fa-IR').format(calculateTotal())} تومان
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm shadow-indigo-200"
          >
            <Save className="w-4 h-4" />
            ثبت سفارش
          </button>
        </div>
      </div>
    </form>
  );
}