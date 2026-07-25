import { Outlet } from "react-router-dom";
import TopBar from "../components/user/TopBar"
import SideBar from "../components/user/SideBar"

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-slate-50">
            <SideBar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <TopBar />

                <main className="flex-1 overflow-y-auto p-6">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}