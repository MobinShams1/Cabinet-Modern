export default function Chart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 bg-white rounded-xl p-6 h-80 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">فروش ماهانه</h3>
        <div className="h-full flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
          📊 نمودار فروش اینجا قرار می‌گیرد
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">وضعیت تولید</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">پروژه A</span>
              <span className="font-medium text-slate-800">۷۰٪</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[70%] h-2 bg-green-500 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">پروژه B</span>
              <span className="font-medium text-slate-800">۴۵٪</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[45%] h-2 bg-yellow-500 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">پروژه C</span>
              <span className="font-medium text-slate-800">۹۰٪</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[90%] h-2 bg-indigo-500 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">پروژه D</span>
              <span className="font-medium text-slate-800">۳۰٪</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[30%] h-2 bg-red-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
