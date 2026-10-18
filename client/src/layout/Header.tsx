import { House, LogOut } from "lucide-react"
import { useUserState } from "../context/AuthContext"
import ProgramMenu from "../features/programs/ProgramMenu";
import { useState } from "react";

export default function Header() {
    const { logout } = useUserState();

    const [showingProgramMenu, setShowingProgramMenu] = useState(false);

    return (
        <div className="flex p-4">
            {showingProgramMenu && <div className="fixed inset-0 z-40" />}
            <ul className="flex space-x-4 items-center">
                <li>
                    <a href="/"><House /></a>
                </li>
                <li>
                    <div className={`relative z-50 p-1 ${showingProgramMenu ? "bg-white rounded-t shadow-lg" : ""}`}>
                        <button onClick={() => setShowingProgramMenu(!showingProgramMenu)} className="hover:font-bold cursor-pointer">Programs</button>
                        {showingProgramMenu && <ProgramMenu />}
                    </div>
                </li>
            </ul>
            <button onClick={logout} className="rounded p-1 cursor-pointer ml-auto hover:bg-red-200" title="Log out"><LogOut /></button>
        </div>
    )
}