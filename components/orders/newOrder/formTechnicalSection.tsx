// app/dashboard/orders/_components/FormTechnicalSection.tsx
"use client";

interface FormTechnicalSectionProps {
  cabinetType: string;
  setCabinetType: (value: string) => void;
  materialType: string;
  setMaterialType: (value: string) => void;
}

export default function FormTechnicalSection({
  cabinetType,
  setCabinetType,
  materialType,
  setMaterialType,
}: FormTechnicalSectionProps) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
      <h4 className="text-sm font-bold text-slate-700 border-r-4 border-indigo-500 pr-2">جزئیات طراحی و متریال</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">سبک طراحی</label>
          <select
            value={cabinetType}
            onChange={(e) => setCabinetType(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer"
          >
            <option value="modern">مدرن (مینیمال / فرامید)</option>
            <option value="classic">کلاسیک (تمام چوب / روکش)</option>
            <option value="neoclassic">نئوکلاسیک (انزو / ممبران)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">جنس ورق / بدنه</label>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer"
          >
            <option value="mdf">MDF ایرانی / خارجی</option>
            <option value="highgloss">های‌گلاس (AGT)</option>
            <option value="membrane">وکیوم / ممبران</option>
            <option value="wood">روکش چوب طبیعی</option>
          </select>
        </div>
      </div>
    </div>
  );
}