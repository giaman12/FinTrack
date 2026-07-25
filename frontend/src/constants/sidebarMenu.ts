import { ArrowRightLeft, ChartPie, Home, PiggyBank, ReceiptText, Settings, Tags, Target, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import type { SidebarMenuItem } from "../types/sidebar";

export const sidebarMenu: SidebarMenuItem[] = [
    {
        title: "Tổng quan",
        path: "/",
        icon: Home,
    },

    {
        title: "Ví tiền",
        path: "/wallet",
        icon: Wallet,
    },

    {
        title: "Thu nhập",
        path: "/income",
        icon: TrendingUp,
    },

    {
        title: "Chi tiêu",
        path: "/expense",
        icon: TrendingDown,
    },

    {
        title: "Chuyển tiền",
        path: "/transfer",
        icon: ArrowRightLeft,
    },

    {
        title: "Danh mục",
        path: "/category",
        icon: Tags,
    },

    {
        title: "Ngân sách",
        path: "/budget",
        icon: PiggyBank,
    },

    {
        title: "Báo cáo",
        path: "/report",
        icon: ChartPie,
    },

    {
        title: "Giao dịch",
        path: "/transaction",
        icon: ReceiptText,
    },

    {
        title: "Mục tiêu",
        path: "/goal",
        icon: Target,
    },

    {
        title: "Cài đặt",
        path: "/setting",
        icon: Settings,
    },
];