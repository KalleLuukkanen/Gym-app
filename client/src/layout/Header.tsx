import { House, LogOut } from "lucide-react"
import { useUserState } from "../context/AuthContext"

export default function Header() {
    const { logout } = useUserState();

    return (
        <div className="flex p-4">
            <nav className="flex space-x-4">
                <a href="/"><House /></a>
                <a href="/programs" className="hover:font-bold">Programs</a>
                <a href="/workouts" className="hover:font-bold">Workouts</a>
            </nav>
            <button onClick={logout} className="rounded p-1 cursor-pointer ml-auto hover:bg-red-200" title="Log out"><LogOut /></button>
        </div>
    )
}