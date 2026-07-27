import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import img_bg from "../../assets/bg_auth.png";
import fb from "../../assets/fb.svg";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState<typeof formData>({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const redirectUrl = searchParams.get("redirect") || "/";

    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            toast.error(error);
            // Xóa param 'error' khỏi URL để không hiển thị lại khi refresh
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        let isValid = true;

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không đúng định dạng";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const data = await response.json();
                    setAuthUser(data); // Lưu thông tin người dùng vào context
                    toast.success("Đăng nhập thành công!");
                    navigate(redirectUrl);
                } else {
                    const errorText = await response.text();
                    if (response.status === 401) { // Unauthorized
                        toast.error(errorText || "Email hoặc mật khẩu không đúng.");
                        setErrors({ email: " ", password: " " }); // Đánh dấu cả 2 trường là lỗi nhưng không hiện text
                    } else if (response.status === 400) { // Bad Request from @Valid
                        const errorJson = JSON.parse(errorText);
                        const newErrors = { email: "", password: "" };
                        if (errorJson.email) newErrors.email = errorJson.email;
                        if (errorJson.password) newErrors.password = errorJson.password;
                        setErrors(newErrors);
                        toast.error("Vui lòng kiểm tra lại thông tin đăng nhập.");
                    } else {
                        toast.error(`Lỗi đăng nhập: ${errorText || 'Không thể kết nối đến máy chủ'}`);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi đăng nhập:", error);
                toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSocialLogin = (provider: string) => {
        if (redirectUrl && redirectUrl !== "/") {
            localStorage.setItem("redirectAfterLogin", redirectUrl);
        }
        localStorage.setItem("socialProvider", provider); // Lưu loại Mạng xã hội đang click
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <>
            <img src={img_bg} alt="Nền" className="fixed inset-0 w-full h-full object-cover object-center -z-10" />

            <div className="flex min-h-screen items-center justify-center px-6 lg:justify-end lg:px-24">
                <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl shadow-2xl md:ml-auto max-h-[95vh] overflow-y-auto">
                    <h1 className="text-[30px] font-bold mb-1 text-center">Đăng nhập</h1>
                    <p className="text-gray-500 mb-2 text-sm text-center">Chào mừng bạn trở lại!</p>

                    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Nhập email của bạn" value={formData.email} onChange={handleChange} className={`w-full pl-2 pr-4 py-2 rounded-[10px] border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-1 outline-none transition-all`} required />
                            {errors.email && errors.email !== " " && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm text-gray-700 font-bold mb-2">Mật khẩu</label>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Nhập mật khẩu của bạn" value={formData.password} onChange={handleChange} className={`w-full pl-2 pr-10 py-2 rounded-[10px] border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-1 outline-none transition-all`} required />
                            <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5">
                                {showPassword ? (<EyeOff className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />) : (<Eye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />)}
                            </div>
                            {errors.password && errors.password !== " " && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 text-[#406D5E] bg-[#F0EEE5] border-gray-300 rounded-[10px] focus:ring-primary focus:ring-1 cursor-pointer accent-primary"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-primary cursor-pointer">
                                    Ghi nhớ mật khẩu
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button type="submit" className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold rounded-[10px] transition-all disabled:bg-emerald-400 disabled:cursor-not-allowed" disabled={isLoading}>
                            Đăng nhập
                        </button>
                    </form>

                    <div className="mt-5 flex items-center justify-between">
                        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                        <p className="text-[14px] text-center text-gray-500">Hoặc đăng nhập với</p>
                        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                    </div>

                    <div className="flex gap-4 mt-4 justify-center">
                        <button type="button"
                            // onClick={() => handleSocialLogin("google")} 
                            className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-[#006c49] hover:-translate-y-0.5 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none transition-all duration-200">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                        </button>

                        <button type="button"
                            onClick={() => handleSocialLogin("facebook")}
                            className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-[#006c49] hover:-translate-y-0.5 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none transition-all duration-200">
                            <img src={fb} alt="Facebook" className="w-7 h-7" />
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="text-emerald-600 font-bold hover:text-primary-container transition-colors">
                            Đăng ký
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;