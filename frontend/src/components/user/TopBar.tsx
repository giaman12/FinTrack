import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Search, User, UserCog, LogOut, LayoutDashboard } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";

const TopBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authUser, logout } = useAuth();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Hàm lấy chữ cái đầu của tên
    const getInitials = (name: string) => {
        if (!name || name === "Đang tải...") return "";
        return name.trim().charAt(0).toUpperCase();
    };

    const getCurrentTitle = () => {
        if (location.pathname === "/profile") {
            return "Hồ sơ của tôi";
        }
        const currentItem = sidebarMenu.find(
            (item) => item.path === location.pathname,
        );
        return currentItem ? currentItem.title : "Tổng quan";
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        toast.success("Đăng xuất thành công!");
        navigate("/login");
    };

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

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
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
                    >
                        {authUser ? (
                            <>
                                {authUser.avatar ? (
                                    <img
                                        src={authUser.avatar}
                                        alt={authUser.fullName}
                                        className="h-11 w-11 rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="h-11 w-11 rounded-full flex items-center justify-center bg-emerald-500 text-amber-50 font-semibold text-lg"
                                        title={authUser.fullName}
                                    >
                                        {getInitials(authUser.fullName)}
                                    </div>
                                )}
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {authUser.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Tài khoản cá nhân
                                    </p>
                                </div>
                                <ChevronDown size={18} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </>
                        ) : (
                            <>
                                <User size={24} className="text-gray-500" />
                                <span className="text-sm font-semibold text-gray-800">Đăng nhập</span>
                            </>
                        )}
                    </button>

                    {/* Menu hiển thị khi isProfileOpen === true */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                            <div className="absolute -top-2 right-5 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                            <div className="relative z-10 bg-white rounded-2xl overflow-hidden">
                                {authUser ? (
                                    <>
                                        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                                            {authUser.avatar ? (
                                                <img src={authUser.avatar} alt={authUser.fullName} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200">
                                                    <span className="font-bold text-base">{getInitials(authUser.fullName)}</span>
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-sm font-bold text-gray-800">{authUser.fullName}</span>
                                                <span className="text-xs text-gray-500 block truncate w-40">{authUser.email}</span>
                                            </div>
                                        </div>

                                        <div className="p-2 flex flex-col gap-1">
                                            {authUser.role === "ADMIN" && (
                                                <Link to="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"><LayoutDashboard size={20} /> Trang quản trị</Link>
                                            )}
                                            <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"><UserCog size={20} /> Hồ sơ của tôi</Link>
                                        </div>

                                        <div className="p-2 border-t border-gray-100">
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"><LogOut size={20} /> Đăng xuất</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-4 text-center">
                                        <p className="text-sm text-gray-600 mb-3">Đăng nhập để quản lý tài chính cá nhân của bạn.</p>
                                        <Link to="/login" onClick={() => setIsProfileOpen(false)} className="w-full block py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">Đăng nhập</Link>
                                        <p className="text-sm text-gray-500 mt-3">Chưa có tài khoản? <Link to="/register" onClick={() => setIsProfileOpen(false)} className="text-emerald-600 font-bold hover:underline">Đăng ký</Link></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;