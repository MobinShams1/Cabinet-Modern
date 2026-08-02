interface StatusItem {
  name: string;
  percentage: number;
}

interface OrderStatusProgressProps {
  statuses?: StatusItem[]; 
}

export default function OrderStatusProgress({ statuses = [] }: OrderStatusProgressProps) {
  const colors = ["bg-emerald-500", "bg-amber-500", "bg-indigo-500", "bg-rose-500"];
  const hasNoData = !statuses || statuses.length === 0;

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:space-y-5 h-full">
      <h3 className="font-bold text-gray-800 text-sm md:text-base">وضعیت سفارشات</h3>

      {hasNoData ? (
        <div className="text-center py-8 text-gray-400 text-xs md:text-sm">
          سفارشی برای محاسبه وجود ندارد
        </div>
      ) : (
        <div className="space-y-3.5 md:space-y-4">
          {statuses.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between text-xs md:text-sm font-medium text-gray-700">
                <span>{item.name}</span>
                <span>%{item.percentage?.toLocaleString("fa-IR") || 0}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 md:h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    colors[index % colors.length]
                  }`}
                  style={{ width: `${item.percentage || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}