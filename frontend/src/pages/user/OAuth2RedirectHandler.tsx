import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            // Lưu token vào localStorage
            localStorage.setItem('jwtToken', token);
            toast.success("Đăng nhập thành công!");
            const redirectAfterLogin = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectAfterLogin);
        } else {
            toast.error(error || "Đăng nhập thất bại. Vui lòng thử lại.");
            navigate("/login");
        }
    }, [location, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Đang xử lý đăng nhập...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;