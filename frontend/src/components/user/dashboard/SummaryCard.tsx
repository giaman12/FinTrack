import {
    ArrowDownRight,
    ArrowUpRight,
} from "lucide-react";

import type { SummaryCardProps } from "../../../types/dashboard";

const SummaryCard = ({
    title,
    value,
    percentage,
    increase,
}: SummaryCardProps) => {

    const money = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(value);

    return (
        <div
            className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md 
            transition-all duration-300">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900">

                        {money}

                    </h2>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-6 flex items-center gap-2">

                {increase ? (
                    <ArrowUpRight
                        size={18}
                        className="text-green-600"
                    />
                ) : (
                    <ArrowDownRight
                        size={18}
                        className="text-red-500"
                    />
                )}

                <span
                    className={`font-semibold ${increase
                        ? "text-green-600"
                        : "text-red-500"
                        }`}
                >

                    {percentage}%

                </span>

                <span className="text-sm text-slate-500">

                    so với tháng trước

                </span>

            </div>

        </div>
    );
};

export default SummaryCard;