import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo_fintrack.png";
import { Moon } from "lucide-react";
import { sidebarMenu } from "../../constants/sidebarMenu";

const SideBar: React.FC = () => {
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
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">

                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Avatar"
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                            Nguyễn Văn A
                        </h3>

                        <p className="text-xs text-gray-500">
                            Personal Account
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    );
};

export default SideBar;