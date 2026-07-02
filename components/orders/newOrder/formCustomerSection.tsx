// app/dashboard/orders/_components/FormCustomerSection.tsx
"use client";

interface FormCustomerSectionProps {
  customerName: string;
  setCustomerName: (value: string) => void;
  customerPhone: string;
  setCustomerPhone: (value: string) => void;
  customerAddress: string;
  setCustomerAddress: (value: string) => void;
}

export default function FormCustomerSection({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
}: FormCustomerSectionProps) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
      <h4 className="text-sm font-bold text-slate-700 border-r-4 border-indigo-500 pr-2">مشخصات مشتری</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">نام و نام خانوادگی</label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="مثال: علی علوی"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">شماره تماس</label>
          <input
            type="text"
            required
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="مثال: 09123456789"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-left dir-ltr outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">آدرس پروژه</label>
        <textarea
          required
          rows={2}
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          placeholder="آدرس دقیق محل اجرای پروژه کابینت..."
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
        />
      </div>
    </div>
  );
}