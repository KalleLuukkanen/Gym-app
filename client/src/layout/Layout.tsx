import { Outlet } from "react-router-dom";
import { useUserState } from "../context/AuthContext";
import Header from "./Header";

export default function Layout() {
    const { userState } = useUserState()

    if (!userState.email) {
        return (
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        );
    } else {
        return (

            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        )
    }
}