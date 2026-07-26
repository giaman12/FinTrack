import { Link } from "react-router-dom";
import img_bg from "../../assets/bg_auth.png";

function ForgotPassword() {
    return (
        <>
            <img src={img_bg} alt="Nền" className="fixed inset-0 w-full h-full object-cover object-center -z-10" />

            <div className="flex min-h-screen items-center justify-center p-6 lg:justify-end lg:p-24">
                {/* Form Quên mật khẩu */}
                <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl shadow-2xl md:ml-auto max-h-[95vh] overflow-y-auto">
                    <h1 className="text-[30px] font-bold mb-2 text-center">Quên mật khẩu</h1>
                    <p className="text-gray-500 mb-6 text-sm text-center">Nhập email của bạn để đặt lại mật khẩu.</p>

                    <form className="space-y-4">

                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Nhập email của bạn" className="w-full pl-2 pr-4 py-2 rounded-[10px] border border-gray-300 focus:ring-1 outline-none transition-all" required />
                        </div>

                        <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold rounded-[10px] transition-all">
                            Gửi yêu cầu
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Bạn đã nhớ mật khẩu?{" "}
                        <Link to="/login" className="text-emerald-600 font-bold hover:text-primary-container transition-colors">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;