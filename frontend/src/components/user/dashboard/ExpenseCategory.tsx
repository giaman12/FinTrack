import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const expenseCategoryData = [
    {
        name: "Ăn uống",
        value: 4200000,
        fill: "#22C55E",
    },
    {
        name: "Di chuyển",
        value: 1800000,
        fill: "#3B82F6",
    },
    {
        name: "Mua sắm",
        value: 2500000,
        fill: "#F97316",
    },
    {
        name: "Giải trí",
        value: 1500000,
        fill: "#A855F7",
    },
    {
        name: "Khác",
        value: 1000000,
        fill: "#94A3B8",
    },
];

const totalExpense = expenseCategoryData.reduce(
    (sum, item) => sum + item.value,
    0
);

const ExpensePieChart = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Chi tiêu theo danh mục
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Phân bổ chi tiêu trong tháng
                    </p>

                </div>

                <select
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-green-500"
                >
                    <option>Tháng này</option>
                    <option>3 tháng</option>
                    <option>6 tháng</option>
                </select>

            </div>

            {/* Chart */}

            <div className="relative h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={expenseCategoryData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={75}
                            outerRadius={105}
                            paddingAngle={4}
                            stroke="none"
                        />

                        <Tooltip
                            formatter={(value) => {
                                if (typeof value === "number") {
                                    return new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                        maximumFractionDigits: 0,
                                    }).format(value);
                                }
                                return value;
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

                {/* Center */}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

                    <p className="text-sm text-slate-500">
                        Tổng chi
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-slate-900">

                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            maximumFractionDigits: 0,
                        }).format(totalExpense)}

                    </h3>

                </div>

            </div>

            {/* Legend */}

            <div className="mt-8 space-y-4">

                {expenseCategoryData.map((item) => {

                    const percent = (
                        (item.value / totalExpense) *
                        100
                    ).toFixed(1);

                    return (

                        <div
                            key={item.name}
                            className="flex items-center justify-between"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{
                                        backgroundColor: item.fill,
                                    }}
                                />

                                <span className="text-sm font-medium text-slate-700">

                                    {item.name}

                                </span>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold text-slate-900">

                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                        maximumFractionDigits: 0,
                                    }).format(item.value)}

                                </p>

                                <p className="text-xs text-slate-500">

                                    {percent}%

                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default ExpensePieChart;