"use client";

import { useState, useEffect } from "react"; 
import { Save, Loader2 } from "lucide-react";
import FormCustomerSection from "./formCustomerSection";
import FormTechnicalSection from "./formTechnicalSection";
import FormItemsSection, { FormItem } from "./formItemsSection";
import { createNewOrder, updateOrder } from "@/actions/ordersAction"; 
import { Order } from "@/types/order";

interface OrderFormProps {
  onClose: () => void;
  onSubmitSuccess?: () => void;
  onOrderAdded?: (order: any) => void; 
  onOrderUpdated?: (order: any) => void; 
  editOrderData?: Order | null;
}

export default function OrderForm({
  onClose,
  onSubmitSuccess,
  onOrderAdded,
  onOrderUpdated,
  editOrderData,
}: OrderFormProps) {
  const isEditMode = !!editOrderData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState(editOrderData?.customerName || "");
  const [customerPhone, setCustomerPhone] = useState(editOrderData?.customerPhone || "");
  const [customerAddress, setCustomerAddress] = useState(editOrderData?.customerAddress || "");
  const [cabinetType, setCabinetType] = useState(editOrderData?.cabinetType || "modern");
  const [materialType, setMaterialType] = useState(editOrderData?.materialType || "mdf");
  const [status, setStatus] = useState(editOrderData?.status || "pending");

  const [items, setItems] = useState<FormItem[]>(() => {
    if (editOrderData?.items && editOrderData.items.length > 0) {
      return editOrderData.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));
    }
    return [{ name: "کابینت آشپزخانه", quantity: 1, price: 0 }];
  });



  useEffect(() => {
    if (editOrderData) {
      setCustomerName(editOrderData.customerName || "");
      setCustomerPhone(editOrderData.customerPhone || "");
      setCustomerAddress(editOrderData.customerAddress || "");
      setCabinetType(editOrderData.cabinetType || "modern");
      setMaterialType(editOrderData.materialType || "mdf");
      setStatus(editOrderData.status || "pending");
      if (editOrderData.items && editOrderData.items.length > 0) {
        setItems(editOrderData.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })));
      }
    }
  }, [editOrderData]);

  const handleAddItem = () => setItems([...items, { name: "", quantity: 1, price: 0 }]);
  const handleRemoveItem = (index: number) => items.length > 1 && setItems(items.filter((_, i) => i !== index));
  const handleItemChange = (index: number, field: keyof FormItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalPriceCalculated = calculateTotal();
    const orderDateStr = editOrderData?.date || new Date().toLocaleDateString("fa-IR");

    if (isEditMode && editOrderData) {
      const updatePayload = {
        rawId: editOrderData.rawId, 
        cabinetType,
        materialType,
        status,
        items,
        totalPrice: totalPriceCalculated,
      };

      const result = await updateOrder(updatePayload);
      setIsSubmitting(false);

      if (result.success) {
        if (onOrderUpdated) {
          onOrderUpdated({
            ...editOrderData,
            customerName,
            customerPhone,
            customerAddress,
            status,
            cabinetType,
            materialType,
            totalPrice: totalPriceCalculated,
            items: items.map((item, index) => ({
              id: index.toString(),
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          });
        }


        if (onSubmitSuccess) onSubmitSuccess();
        onClose();
      } else {
        alert(`متاسفانه خطایی در ویرایش رخ داد: ${result.error || "خطای ناشناخته"}`);
      }
    } else {
      const orderPayload = {
        customerName,
        customerPhone,
        customerAddress,
        cabinetType,
        materialType,
        items,
        totalPrice: totalPriceCalculated,
        orderDate: orderDateStr,
      };

      const result = await createNewOrder(orderPayload);
      setIsSubmitting(false);

      if (result.success) {
        if (onOrderAdded) {
          onOrderAdded({
            id: `ORD-${result.orderId}`,
            rawId: result.orderId,
            customerName,
            customerPhone,
            customerAddress,
            date: orderDateStr,
            status: "pending",
            totalPrice: totalPriceCalculated,
            cabinetType,
            materialType,
            items: items.map((item, index) => ({
              id: index.toString(),
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          });
        }
        if (onSubmitSuccess) onSubmitSuccess();
        onClose();
      } else {
        alert(`متاسفانه خطایی در ثبت رخ داد: ${result.error || "خطای ناشناخته"}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto p-1">
      {isEditMode && (
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
          <label className="block text-xs font-semibold text-amber-800 mb-1">تغییر وضعیت سفارش کابینت</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="pending">در انتظار تایید</option>
            <option value="designing">در حال طراحی</option>
            <option value="in-progress">در حال انجام / ساخت</option>
            <option value="completed">تکمیل و نصب شده</option>
            <option value="cancelled">لغو شده</option>
          </select>
        </div>
      )}

      <FormCustomerSection customerName={customerName} setCustomerName={setCustomerName} customerPhone={customerPhone} setCustomerPhone={setCustomerPhone} customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} />
      <FormTechnicalSection cabinetType={cabinetType} setCabinetType={setCabinetType} materialType={materialType} setMaterialType={setMaterialType} />
      <FormItemsSection items={items} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} onItemChange={handleItemChange} />

      <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <span className="text-xs text-slate-500">مبلغ کل فاکتور: </span>
          <span className="text-lg font-bold text-slate-800">{new Intl.NumberFormat("fa-IR").format(calculateTotal())} تومان</span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button type="button" disabled={isSubmitting} onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition disabled:opacity-50">انصراف</button>
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm shadow-indigo-200 disabled:opacity-70">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> در حال ذخیره‌سازی...</> : <><Save className="w-4 h-4" /> {isEditMode ? "بروزرسانی سفارش" : "ثبت سفارش"}</>}
          </button>
        </div>
      </div>
    </form>
  );
}