export default function OrderTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">سفارشات اخیر</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          مشاهده همه
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100 bg-slate-50">
              <th className="p-4 text-sm font-semibold text-slate-600">
                شماره سفارش
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600">
                مشتری
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600">مبلغ</th>
              <th className="p-4 text-sm font-semibold text-slate-600">
                وضعیت
              </th>
              <th className="p-4 text-sm font-semibold text-slate-600">
                تاریخ
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="p-4 text-sm font-medium text-slate-800">#۱۰۱</td>
              <td className="p-4 text-sm text-slate-600">علی احمدی</td>
              <td className="p-4 text-sm font-medium text-slate-800">
                ۱۵,۰۰۰,۰۰۰ تومان
              </td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  تکمیل شده
                </span>
              </td>
              <td className="p-4 text-sm text-slate-500">۱۴۰۳/۰۲/۱۵</td>
            </tr>

            <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="p-4 text-sm font-medium text-slate-800">#۱۰۲</td>
              <td className="p-4 text-sm text-slate-600">رضا کریمی</td>
              <td className="p-4 text-sm font-medium text-slate-800">
                ۲۲,۰۰۰,۰۰۰ تومان
              </td>
              <td className="p-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                  در حال انجام
                </span>
              </td>
              <td className="p-4 text-sm text-slate-500">۱۴۰۳/۰۲/۱۴</td>
            </tr>

            <tr className="hover:bg-slate-50 transition">
              <td className="p-4 text-sm font-medium text-slate-800">#۱۰۳</td>
              <td className="p-4 text-sm text-slate-600">سارا محمدی</td>
              <td className="p-4 text-sm font-medium text-slate-800">
                ۱۸,۰۰۰,۰۰۰ تومان
              </td>
              <td className="p-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  در حال طراحی
                </span>
              </td>
              <td className="p-4 text-sm text-slate-500">۱۴۰۳/۰۲/۱۳</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
