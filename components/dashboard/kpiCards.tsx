export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm">سفارشات امروز</h3>
        <p className="text-3xl font-bold mt-2 text-slate-800">۲۴</p>
        <span className="text-xs text-green-600 mt-1 inline-block">
          ↑ ۱۲٪ نسبت به دیروز
        </span>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm">مشتریان فعال</h3>
        <p className="text-3xl font-bold mt-2 text-slate-800">۱۵۶</p>
        <span className="text-xs text-green-600 mt-1 inline-block">
          ↑ ۸٪ نسبت به ماه قبل
        </span>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm">درآمد کل</h3>
        <p className="text-3xl font-bold mt-2 text-slate-800">۸۵۰M</p>
        <span className="text-xs text-green-600 mt-1 inline-block">
          ↑ ۲۳٪ نسبت به ماه قبل
        </span>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm">پروژه‌های فعال</h3>
        <p className="text-3xl font-bold mt-2 text-slate-800">۱۲</p>
        <span className="text-xs text-yellow-600 mt-1 inline-block">
          ۴ مورد در صف انتظار
        </span>
      </div>
    </div>
  );
}
