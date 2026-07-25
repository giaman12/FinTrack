import type { GreetingProps } from "../../../types/dashboard";
import { CalendarDays } from "lucide-react";

const Greeting = ({
    userName,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}: GreetingProps) => {
    return (
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Xin chào,
                    </h1>

                    <span className="text-3xl font-bold text-green-600">
                        {userName}
                    </span>

                    {/* <span className="text-3xl">👋</span> */}
                </div>

                <p className="mt-2 text-slate-500">
                    Cùng xem tình hình tài chính của bạn hôm nay nhé!
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <CalendarDays
                    size={20}
                    className="text-green-600"
                />

                <div className="flex items-center gap-3">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-500"
                    />

                    <span className="text-slate-400">—</span>

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Greeting;