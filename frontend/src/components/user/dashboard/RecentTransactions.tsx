import {
    ArrowDownLeft,
    ArrowUpRight,
    Car,
    ShoppingBag,
    Utensils,
} from "lucide-react";

const transactions = [
    {
        id: 1,
        title: "Lương tháng 7",
        category: "Thu nhập",
        date: "25/07/2026",
        amount: 18000000,
        type: "income",
        icon: ArrowDownLeft,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        id: 2,
        title: "Ăn trưa",
        category: "Ăn uống",
        date: "24/07/2026",
        amount: 120000,
        type: "expense",
        icon: Utensils,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-500",
    },
    {
        id: 3,
        title: "Đổ xăng",
        category: "Di chuyển",
        date: "24/07/2026",
        amount: 80000,
        type: "expense",
        icon: Car,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        id: 4,
        title: "Mua quần áo",
        category: "Mua sắm",
        date: "22/07/2026",
        amount: 650000,
        type: "expense",
        icon: ShoppingBag,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
    },
    {
        id: 5,
        title: "Thưởng dự án",
        category: "Thu nhập",
        date: "20/07/2026",
        amount: 3500000,
        type: "income",
        icon: ArrowUpRight,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
];

const formatMoney = (money: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(money);

const RecentTransactions = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Giao dịch gần đây
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Những giao dịch mới nhất
                    </p>

                </div>

                <button
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition
                        hover:bg-slate-100
                    "
                >
                    Xem tất cả
                </button>

            </div>

            {/* List */}

            <div className="space-y-4">

                {transactions.map((transaction) => {

                    const Icon = transaction.icon;

                    return (

                        <div
                            key={transaction.id}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-slate-100
                                p-4
                                transition
                                hover:bg-slate-50
                            "
                        >

                            {/* Left */}

                            <div className="flex items-center gap-4">

                                <div
                                    className={`
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${transaction.iconBg}
                                    `}
                                >

                                    <Icon
                                        size={22}
                                        className={transaction.iconColor}
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-slate-900">

                                        {transaction.title}

                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">

                                        {transaction.category}

                                        {" • "}

                                        {transaction.date}

                                    </p>

                                </div>

                            </div>

                            {/* Right */}

                            <div
                                className={`text-right ${transaction.type === "income"
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >

                                <p className="text-lg font-bold">

                                    {transaction.type === "income"
                                        ? "+"
                                        : "-"}

                                    {formatMoney(transaction.amount)}

                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default RecentTransactions;