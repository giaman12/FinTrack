import SummaryCard from "./SummaryCard";

const SummaryCards = () => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Tổng số dư"
                value={15000000}
                percentage={8.5}
                increase={true}
            />

            <SummaryCard
                title="Tổng thu nhập"
                value={28000000}
                percentage={12}
                increase={true}
            />

            <SummaryCard
                title="Tổng chi tiêu"
                value={12500000}
                percentage={5.2}
                increase={false}
            />

            <SummaryCard
                title="Số dư còn lại"
                value={15500000}
                percentage={18}
                increase={true}
            />
        </div>
    );
};

export default SummaryCards;