import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo_fintrack.png";
import { Moon, User } from "lucide-react";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { useAuth } from "../../contexts/AuthContext";

const SideBar: React.FC = () => {
    const { authUser } = useAuth();

    // Hàm lấy chữ cái đầu của tên
    const getInitials = (name: string) => {
        if (!name || name === "Đang tải...") return "";
        return name.trim().charAt(0).toUpperCase();
    };

    return (
        <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">

            {/* Logo */}
            <div className="flex h-20 items-center justify-center border-b border-gray-200">
                <img
                    src={logo}
                    alt="FinTrack Logo"
                    className="mr-2 h-16 w-16"
                />
                <h1 className="text-3xl font-bold text-green-600">
                    FinTrack
                </h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">

                <ul className="space-y-2">

                    {sidebarMenu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                    ${isActive
                                            ? "bg-green-100 text-green-700 font-semibold"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    <Icon size={20} />

                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        );
                    })}

                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">

                {/* Theme */}
                <button
                    className="mb-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-100"
                >
                    <Moon size={20} />
                    <span>Chế độ tối</span>
                </button>

                {/* User */}
                {authUser ? (
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">

                        {authUser.avatar ? (
                            <img
                                src={authUser.avatar}
                                alt="Avatar"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className="h-12 w-12 rounded-full flex items-center justify-center bg-emerald-500 text-amber-50 font-semibold text-xl"
                                title={authUser.fullName}
                            >
                                {getInitials(authUser.fullName)}
                            </div>
                        )}

                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                {authUser.fullName}
                            </h3>

                            <p className="text-xs text-gray-500">
                                Tài khoản cá nhân
                            </p>
                        </div>

                    </div>
                ) : (
                    <NavLink
                        to="/login"
                        className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 hover:bg-gray-100 transition"
                    >
                        <User size={24} className="text-gray-500" />
                        <div className="text-left">
                            <h3 className="text-sm font-semibold text-gray-800">Đăng nhập</h3>
                        </div>
                    </NavLink>
                )} 

            </div>

        </aside>
    );
};

export default SideBar;