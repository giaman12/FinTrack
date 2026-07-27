import type { ReactNode } from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu cho người dùng, tương ứng với UserResponse từ backend
interface User {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    status: string;
    role: string;
}

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
    authUser: User | null;
    setAuthUser: (user: User | null) => void;
    isLoggedIn: boolean;
    logout: () => void;
}

// Tạo AuthContext với giá trị mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tạo AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Khởi tạo trạng thái authUser từ localStorage
    const [authUser, setAuthUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('authUser');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse authUser from localStorage", error);
            return null;
        }
    });

    // Lưu authUser vào localStorage mỗi khi nó thay đổi
    useEffect(() => {
        if (authUser) localStorage.setItem('authUser', JSON.stringify(authUser));
        else localStorage.removeItem('authUser');
    }, [authUser]);

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem('authUser');
    };

    const isLoggedIn = !!authUser;

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Tạo custom hook để sử dụng AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};