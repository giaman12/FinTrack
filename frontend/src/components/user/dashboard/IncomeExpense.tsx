import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    {
        month: "T1",
        income: 18000000,
        expense: 12000000,
    },
    {
        month: "T2",
        income: 22000000,
        expense: 15000000,
    },
    {
        month: "T3",
        income: 27000000,
        expense: 18000000,
    },
    {
        month: "T4",
        income: 24000000,
        expense: 16500000,
    },
    {
        month: "T5",
        income: 30000000,
        expense: 21000000,
    },
    {
        month: "T6",
        income: 33000000,
        expense: 23000000,
    },
    {
        month: "T7",
        income: 35000000,
        expense: 25000000,
    },
];

const IncomeExpenseChart = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Thu chi trong tháng
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Theo dõi thu nhập và chi tiêu của bạn
                    </p>

                </div>

                <select
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        px-4
                        py-2
                        text-sm
                        outline-none
                        focus:border-green-500
                    "
                >
                    <option>Tháng này</option>
                    <option>3 tháng</option>
                    <option>6 tháng</option>
                    <option>1 năm</option>
                </select>

            </div>

            {/* Chart */}

            <div className="h-96">

                <ResponsiveContainer>

                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 0,
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="incomeGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#22c55e"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#22c55e"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                            <linearGradient
                                id="expenseGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#ef4444"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#ef4444"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) =>
                                `${value / 1000000}M`
                            }
                        />

                        <Tooltip
                            formatter={(value) => {
                                if (typeof value === "number") {
                                    return new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(value);
                                }
                                return value;
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="income"
                            name="Thu nhập"
                            stroke="#22c55e"
                            strokeWidth={3}
                            fill="url(#incomeGradient)"
                        />

                        <Area
                            type="monotone"
                            dataKey="expense"
                            name="Chi tiêu"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fill="url(#expenseGradient)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

            {/* Legend */}

            <div className="mt-6 flex justify-center gap-8">

                <div className="flex items-center gap-2">

                    <div className="h-3 w-3 rounded-full bg-green-500"></div>

                    <span className="text-sm text-slate-600">
                        Thu nhập
                    </span>

                </div>

                <div className="flex items-center gap-2">

                    <div className="h-3 w-3 rounded-full bg-red-500"></div>

                    <span className="text-sm text-slate-600">
                        Chi tiêu
                    </span>

                </div>

            </div>

        </div>
    );
};

export default IncomeExpenseChart;