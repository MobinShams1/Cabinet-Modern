interface KpiCardsProps {
  todaysOrders: number;
  activeCustomers: number;
  totalRevenue: number;
  activeProjects: number;
}

export default function KpiCards({
  todaysOrders,
  activeCustomers,
  totalRevenue,
  activeProjects,
}: KpiCardsProps) {
  const cards = [
    {
      title: "پروژه‌های فعال",
      value: activeProjects,
      subtext: "مورد در صف انتظار",
      badgeColor: "text-amber-500",
    },
    {
      title: "درآمد کل",
      value: `${(totalRevenue / 1_000_000).toLocaleString("fa-IR")}M تومان`,
      subtext: "نسبت به ماه قبل ۲۳٪ ↑",
      badgeColor: "text-emerald-500",
    },
    {
      title: "مشتریان فعال",
      value: activeCustomers.toLocaleString("fa-IR"),
      subtext: "نسبت به ماه قبل ۸٪ ↑",
      badgeColor: "text-emerald-500",
    },
    {
      title: "سفارشات امروز",
      value: todaysOrders.toLocaleString("fa-IR"),
      subtext: "نسبت به دیروز ۱۲٪ ↑",
      badgeColor: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2"
        >
          <span className="text-gray-500 text-sm font-medium">{card.title}</span>
          <div className="text-3xl font-extrabold text-gray-800">{card.value}</div>
          <div className={`text-xs font-medium ${card.badgeColor}`}>{card.subtext}</div>
        </div>
      ))}
    </div>
  );
}