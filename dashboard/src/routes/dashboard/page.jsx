import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "@/hooks/use-theme";
import { recentSalesData, topProducts, dummyData } from "@/constants";
import { Footer } from "@/layouts/footer";

import {
  CreditCard,
  DollarSign,
  Package,
  PencilLine,
  Star,
  Trash,
  TrendingUp,
  Users,
} from "lucide-react";

const DashboardPage = () => {
  const { theme } = useTheme();

  const { analyticsSummary } = dummyData;

  const chartData = analyticsSummary.recentActivities.map((item, index) => ({
    name: new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    total: (index + 1) * 1000,
  }));

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card icon={<Package size={26} />} title="Total Users" value={analyticsSummary.totalUsers} />
        <Card icon={<DollarSign size={26} />} title="New Signups Today" value={analyticsSummary.newSignupsToday} />
        <Card icon={<Users size={26} />} title="Active Users" value={analyticsSummary.activeUsers} />
        <Card icon={<CreditCard size={26} />} title="Revenue Today" value={analyticsSummary.revenueToday} />
      </div>

      {/* Chart + Sales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart */}
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
          <div className="card-header">
            <p className="card-title">Overview</p>
          </div>
          <div className="card-body p-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip cursor={false} formatter={(value) => `$${value}`} />
                <XAxis
                  dataKey="name"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#475569" : "#94a3b8"}
                  tickMargin={6}
                />
                <YAxis
                  dataKey="total"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#475569" : "#94a3b8"}
                  tickFormatter={(value) => `$${value}`}
                  tickMargin={6}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Recent Sales</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0">
            {recentSalesData.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between gap-x-4 py-2 pr-2">
                <div className="flex items-center gap-x-4">
                  <img src={sale.image} alt={sale.name} className="size-10 flex-shrink-0 rounded-full object-cover" />
                  <div className="flex flex-col gap-y-2">
                    <p className="font-medium text-slate-900 dark:text-slate-50">{sale.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{sale.email}</p>
                  </div>
                </div>
                <p className="font-medium text-slate-900 dark:text-slate-50">${sale.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities – Stylish View */}
      <div className="card">
        <div className="card-header">
          <p className="card-title">Recent Activities</p>
        </div>
        <div className="card-body h-[300px] overflow-auto space-y-4 p-4">
          {analyticsSummary.recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition duration-300 bg-white dark:bg-slate-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">ID:</span> {activity.id}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Type:</span> {activity.type}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Description:</span> {activity.description}
                  </p>
                </div>
                <div className="text-xs text-right text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Orders */}
      <div className="card">
        <div className="card-header">
          <p className="card-title">Top Orders</p>
        </div>
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full overflow-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Product</th>
                  <th className="table-head">Price</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Rating</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {topProducts.map((product) => (
                  <tr key={product.number} className="table-row">
                    <td className="table-cell">{product.number}</td>
                    <td className="table-cell">
                      <div className="flex w-max gap-x-4">
                        <img src={product.image} alt={product.name} className="size-14 rounded-lg object-cover" />
                        <div className="flex flex-col">
                          <p>{product.name}</p>
                          <p className="font-normal text-slate-600 dark:text-slate-400">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">${product.price}</td>
                    <td className="table-cell">{product.status}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-2">
                        <Star size={18} className="fill-yellow-600 stroke-yellow-600" />
                        {product.rating}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-4">
                        <button className="text-blue-500 dark:text-blue-600">
                          <PencilLine size={20} />
                        </button>
                        <button className="text-red-500">
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="card">
    <div className="card-header">
      <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
        {icon}
      </div>
      <p className="card-title">{title}</p>
    </div>
    <div className="card-body bg-slate-100 dark:bg-slate-950">
      <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
      <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
        <TrendingUp size={18} />
        12%
      </span>
    </div>
  </div>
);

export default DashboardPage;
