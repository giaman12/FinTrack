import React from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { sidebarMenu } from "../../constants/sidebarMenu";

const TopBar: React.FC = () => {
    const location = useLocation();

    const getCurrentTitle = () => {
        const currentItem = sidebarMenu.find(
            (item) => item.path === location.pathname,
        );
        return currentItem ? currentItem.title : "Tổng quan";
    };

    return (
        <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200 shadow-sm">
            {/* Trái */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    {getCurrentTitle()}
                </h1>
            </div>

            {/* Phải */}
            <div className="flex items-center gap-5">

                {/* Tìm kiếm */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Thông báo */}
                <button
                    className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </button>

                {/* Người dùng */}
                <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition">

                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Avatar"
                        className="h-11 w-11 rounded-full object-cover"
                    />

                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">
                            Nguyễn Văn A
                        </p>

                        <p className="text-xs text-gray-500">
                            Personal Account
                        </p>
                    </div>

                    <ChevronDown size={18} className="text-gray-500" />
                </button>

            </div>

        </header>
    );
};

export default TopBar;