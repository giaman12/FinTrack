import { useState } from "react";
import Greeting from "../../components/user/dashboard/Greeting";
import SummaryCards from "../../components/user/dashboard/SummaryCards";
import IncomeExpense from "../../components/user/dashboard/IncomeExpense";
import ExpenseCategory from "../../components/user/dashboard/ExpenseCategory";
import RecentTransactions from "../../components/user/dashboard/RecentTransactions";
import BudgetCard from "../../components/user/dashboard/BudgetCard";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
    const { authUser } = useAuth();

    const [startDate, setStartDate] = useState("2026-07-01");

    const [endDate, setEndDate] = useState("2026-07-31");

    return (
        <>

            <Greeting
                userName={authUser?.fullName || "Đang tải..."}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />

            <SummaryCards />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Cột trái */}
                <div className="flex flex-col gap-6">
                    <IncomeExpense />
                    <RecentTransactions />
                </div>
                {/* Cột phải */}
                <div className="flex flex-col gap-6">
                    <ExpenseCategory />
                    <BudgetCard />
                </div>
            </div>
        </>
    );
}

export default Home;