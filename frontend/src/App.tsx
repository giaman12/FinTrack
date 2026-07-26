import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/user/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import ForgotPassword from "./pages/user/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      {/* Toaster để hiển thị thông báo trên toàn ứng dụng */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />\
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;