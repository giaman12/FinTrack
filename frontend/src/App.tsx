import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/user/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import UserProfile from "./pages/user/UserProfile";
import ForgotPassword from "./pages/user/ForgotPassword";
import OAuth2RedirectHandler from "./pages/user/OAuth2RedirectHandler";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Toaster để hiển thị thông báo trên toàn ứng dụng */}
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>

          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />

          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />\
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;