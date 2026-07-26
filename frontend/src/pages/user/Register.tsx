import { Link, useNavigate } from "react-router-dom";
import img_bg from "../../assets/bg_auth.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState<typeof formData>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = { fullName: "", email: "", password: "", confirmPassword: "" };
        let isValid = true;

        // Họ và tên
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Họ và tên không được để trống";
            isValid = false;
        } else if (!/^[a-zA-Zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/.test(formData.fullName)) {
            newErrors.fullName = "Họ và tên không được chứa số hoặc ký tự đặc biệt.";
            isValid = false;
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không đúng định dạng";
            isValid = false;
        }

        // Mật khẩu
        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
            isValid = false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/.test(formData.password)) {
            newErrors.password = "Mật khẩu phải gồm chữ hoa, thường, số và ký tự đặc biệt.";
            isValid = false;
        }

        // Xác nhận mật khẩu
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // const data = await response.json();
                    toast.success("Đăng ký thành công!");
                    navigate("/login");
                } else {
                    // Xử lý lỗi từ backend
                    if (response.status === 400) { // Bad Request
                        // Clone response để đọc body nhiều lần
                        const responseClone = response.clone();
                        try {
                            // Thử parse thành JSON -> Lỗi validation từ @Valid
                            const errorJson = await response.json();
                            const newErrors = { fullName: "", email: "", password: "", confirmPassword: "" };
                            if (errorJson.fullName) newErrors.fullName = errorJson.fullName;
                            if (errorJson.email) newErrors.email = errorJson.email;
                            if (errorJson.password) newErrors.password = errorJson.password;
                            if (errorJson.confirmPassword) newErrors.confirmPassword = errorJson.confirmPassword;
                            setErrors(newErrors);
                            toast.error("Vui lòng kiểm tra lại thông tin đăng ký.");
                        } catch {
                            // Nếu parse JSON thất bại -> Lỗi text (Mật khẩu không khớp)
                            const errorText = await responseClone.text();
                            setErrors(prev => ({ ...prev, confirmPassword: errorText }));
                        }
                    } else if (response.status === 409) { // Lỗi email đã tồn tại
                        const errorText = await response.text();
                        setErrors(prev => ({ ...prev, email: errorText }));
                    } else {
                        // Các lỗi chung khác
                        const errorText = await response.text();
                        toast.error(`Lỗi đăng ký: ${errorText || 'Không thể kết nối đến máy chủ'}`);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi đăng ký:", error);
                toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <img src={img_bg} alt="Nền" className="fixed inset-0 w-full h-full object-cover object-center -z-10" />

            <div className="flex min-h-screen items-center justify-center px-6 lg:justify-end lg:px-24">
                {/* Form Đăng ký */}
                <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl shadow-2xl md:ml-auto max-h-[95vh] overflow-y-auto">
                    <h1 className="text-[30px] font-bold mb-1 text-center">Tạo tài khoản</h1>
                    <p className="text-gray-500 mb-2 text-sm text-center">Bắt đầu hành trình quản lý tài chính của bạn</p>

                    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-2">Họ và tên</label>
                            <input type="text" name="fullName" placeholder="Nhập họ và tên" value={formData.fullName} onChange={handleChange} className={`w-full pl-2 pr-4 py-2 rounded-[10px] border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-1 outline-none transition-all`} required />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Nhập email của bạn" value={formData.email} onChange={handleChange} className={`w-full pl-2 pr-4 py-2 rounded-[10px] border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-1 outline-none transition-all`} required />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm text-gray-700 font-bold mb-2">Mật khẩu</label>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Nhập mật khẩu của bạn" value={formData.password} onChange={handleChange} className={`w-full pl-2 pr-10 py-2 rounded-[10px] border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-1 outline-none transition-all`} required />
                            <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5">
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm text-gray-700 font-bold mb-2">Xác nhận mật khẩu</label>
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleChange} className={`w-full pl-2 pr-10 py-2 rounded-[10px] border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-1 outline-none transition-all`} required />
                            <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5">
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                                )}
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold rounded-[10px] transition-all disabled:bg-emerald-400 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            Đăng ký
                        </button>
                    </form>

                    {/* Đăng nhập khi đã có tài khoản */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-emerald-600 font-bold hover:text-primary-container transition-colors">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;