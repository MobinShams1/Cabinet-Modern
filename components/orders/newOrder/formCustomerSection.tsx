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
    <div className="bg-slate-50/80 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 space-y-4">
      <h4 className="text-sm font-bold text-slate-800 border-r-4 border-indigo-500 pr-2.5">
        مشخصات مشتری
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="مثال: علی علوی"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            شماره تماس
          </label>
          <input
            type="tel"
            required
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="مثال: 09123456789"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-left dir-ltr outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-right placeholder:dir-rtl placeholder:text-slate-400"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          آدرس پروژه
        </label>
        <textarea
          required
          rows={2}
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          placeholder="آدرس دقیق محل اجرای پروژه کابینت..."
          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}