import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Edit, Camera, Save, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const UserProfile: React.FC = () => {
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: authUser?.fullName || "",
        email: authUser?.email || "",
        phone: authUser?.phone || "",
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(authUser?.avatar || null);

    if (!authUser) {
        navigate("/login");
        return null;
    }

    const getInitials = (name: string) => {
        if (!name || name === "Đang tải...") return "";
        return name.trim().charAt(0).toUpperCase();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = async (e: React.ChangeEvent) => {
        e.preventDefault();

        try {
            if (avatarFile) {
                console.log("New avatar selected:", avatarFile.name);
            }

            const updatedUser = {
                ...authUser,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                avatar: avatarPreview || authUser.avatar,
            };
            setAuthUser(updatedUser);

            toast.success("Cập nhật hồ sơ thành công!");
            setIsEditing(false);
            setAvatarFile(null);
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            toast.error("Đã có lỗi xảy ra khi cập nhật hồ sơ.");
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({
            fullName: authUser.fullName,
            email: authUser.email,
            phone: authUser.phone || "",
        });
        setAvatarPreview(authUser.avatar || null);
        setAvatarFile(null);
    };

    return (
        <div className="container mx-auto p-2">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative group mb-4">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar"
                                className="h-32 w-32 rounded-full object-cover border-4 border-emerald-500"
                            />
                        ) : (
                            <div
                                className="h-32 w-32 rounded-full flex items-center justify-center bg-emerald-500 text-amber-50 font-semibold text-5xl border-4 border-emerald-500"
                                title={authUser.fullName}
                            >
                                {getInitials(authUser.fullName)}
                            </div>
                        )}
                        {isEditing && (
                            <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" title="Thay đổi ảnh đại diện">
                                <Camera size={32} />
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{authUser.fullName}</h2>
                    <p className="text-gray-600">{authUser.email}</p>
                </div>

                <form onSubmit={handleSaveProfile}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-500 py-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-500 py-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-500 py-2.5"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <XCircle size={20} className="mr-2" /> Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <Save size={20} className="mr-2" /> Lưu
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                <Edit size={20} className="mr-2" /> Chỉnh sửa hồ sơ
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;