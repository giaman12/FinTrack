export interface GreetingProps {
    userName: string;
    startDate: string;
    endDate: string;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
}

export interface SummaryCardProps {
    title: string;
    value: number;
    percentage: number;
    increase: boolean;
}

export interface IncomeExpenseProps {
    month: string;
    income: string;
    expense: string;
}

export interface ExpenseCategory {
    name: string;
    value: number;
    color: string;
}