import { Link } from "react-router-dom";
import img_bg from "../../assets/bg_auth.png";
import fb from "../../assets/fb.svg";

function Login() {
    return (
        <>
            <img src={img_bg} alt="Nền" className="fixed inset-0 w-full h-full object-cover object-center -z-10" />

            <div className="flex min-h-screen items-center justify-center px-6 lg:justify-end lg:px-24">
                {/* Form Đăng nhập */}
                <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl shadow-2xl md:ml-auto max-h-[95vh] overflow-y-auto">
                    <h1 className="text-[30px] font-bold mb-1 text-center">Đăng nhập</h1>
                    <p className="text-gray-500 mb-2 text-sm text-center">Chào mừng bạn trở lại!</p>

                    <form className="space-y-3">

                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Nhập email của bạn" className="w-full pl-2 pr-4 py-2 rounded-[10px] border border-gray-300 focus:ring-1 outline-none transition-all" required />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-bold mb-2">Mật khẩu</label>
                            <input type="password" name="password" placeholder="Nhập mật khẩu của bạn" className="w-full pl-2 pr-4 py-2 rounded-[10px] border border-gray-300 focus:ring-1 outline-none transition-all" required />
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

                        <button type="submit" className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold rounded-[10px] transition-all">
                            Đăng nhập
                        </button>
                    </form>

                    {/* Đăng ký bằng GG hoặc FB */}
                    <div className="mt-5 flex items-center justify-between">
                        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                        <p className="text-[14px] text-center text-gray-500">Hoặc đăng nhập với</p>
                        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
                    </div>

                    <div className="flex gap-4 mt-4 justify-center">
                        {/* GG */}
                        <button type="button"
                            // onClick={() => handleSocialLogin("google")} 
                            className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-[#006c49] hover:-translate-y-0.5 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none transition-all duration-200">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                        </button>

                        {/* FB */}
                        <button type="button"
                            // onClick={() => handleSocialLogin("facebook")}
                            className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-[#006c49] hover:-translate-y-0.5 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49] outline-none transition-all duration-200">
                            <img src={fb} alt="Facebook" className="w-7 h-7" />
                        </button>
                    </div>

                    {/* Đăng nhập khi đã có tài khoản */}
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