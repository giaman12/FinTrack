import {
    CircleAlert,
    CircleCheckBig,
} from "lucide-react";

const budgets = [
    {
        id: 1,
        category: "Ăn uống",
        spent: 4200000,
        budget: 5000000,
        color: "bg-green-500",
    },
    {
        id: 2,
        category: "Di chuyển",
        spent: 1800000,
        budget: 2500000,
        color: "bg-blue-500",
    },
    {
        id: 3,
        category: "Mua sắm",
        spent: 2500000,
        budget: 3000000,
        color: "bg-orange-500",
    },
    {
        id: 4,
        category: "Giải trí",
        spent: 1600000,
        budget: 1500000,
        color: "bg-red-500",
    },
];

const formatMoney = (money: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(money);

const totalBudget = budgets.reduce(
    (sum, item) => sum + item.budget,
    0,
);

const totalSpent = budgets.reduce(
    (sum, item) => sum + item.spent,
    0,
);

const remain = totalBudget - totalSpent;

const percent = Math.min(
    (totalSpent / totalBudget) * 100,
    100,
);

const BudgetCard = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Ngân sách tháng
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Theo dõi ngân sách của bạn
                    </p>

                </div>

            </div>

            {/* Tổng */}

            <div className="mt-6 rounded-xl bg-slate-50 p-5">

                <div className="flex items-center justify-between">

                    <span className="text-slate-500">
                        Tổng ngân sách
                    </span>

                    <span className="font-bold text-slate-900">
                        {formatMoney(totalBudget)}
                    </span>

                </div>

                <div className="mt-3 flex items-center justify-between">

                    <span className="text-slate-500">
                        Đã chi
                    </span>

                    <span className="font-semibold text-red-500">
                        {formatMoney(totalSpent)}
                    </span>

                </div>

                <div className="mt-3 flex items-center justify-between">

                    <span className="text-slate-500">
                        Còn lại
                    </span>

                    <span className="font-semibold text-green-600">
                        {formatMoney(remain)}
                    </span>

                </div>

                {/* Progress */}

                <div className="mt-5">

                    <div className="mb-2 flex justify-between text-sm">

                        <span>Đã sử dụng</span>

                        <span>{percent.toFixed(0)}%</span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-green-500 transition-all"
                            style={{
                                width: `${percent}%`,
                            }}
                        />

                    </div>

                </div>

            </div>

            {/* Danh sách ngân sách */}

            <div className="mt-8 space-y-5">

                {budgets.map((budget) => {

                    const progress = Math.min(
                        (budget.spent / budget.budget) * 100,
                        100,
                    );

                    const overBudget =
                        budget.spent > budget.budget;

                    return (

                        <div key={budget.id}>

                            <div className="mb-2 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <span className="font-medium text-slate-700">

                                        {budget.category}

                                    </span>

                                    {overBudget ? (
                                        <CircleAlert
                                            size={16}
                                            className="text-red-500"
                                        />
                                    ) : (
                                        <CircleCheckBig
                                            size={16}
                                            className="text-green-500"
                                        />
                                    )}

                                </div>

                                <span className="text-sm text-slate-500">

                                    {formatMoney(budget.spent)}

                                    {" / "}

                                    {formatMoney(budget.budget)}

                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                                <div
                                    className={`${budget.color} h-full rounded-full transition-all`}
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default BudgetCard;