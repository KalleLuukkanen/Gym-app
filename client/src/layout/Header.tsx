import { House, LogOut } from "lucide-react"
import { useUserState } from "../context/AuthContext"
import ProgramMenu from "../features/programs/ProgramMenu";
import WorkoutMenu from "../features/workouts/WorkoutMenu";
import { useState } from "react";

export default function Header() {
    const { logout } = useUserState();

    const [showingProgramMenu, setShowingProgramMenu] = useState(false);
    const [showingWorkoutMenu, setShowingWorkoutMenu] = useState(false);

    return (
        <div className="flex p-4">
            {(showingProgramMenu || showingWorkoutMenu) &&
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowingProgramMenu(false);
                        setShowingWorkoutMenu(false);
                    }}
                />}
            <ul className="flex space-x-4 items-center">
                <li>
                    <a href="/"><House /></a>
                </li>
                <li className={`relative z-50 p-1 ${showingProgramMenu ? "bg-white rounded-t shadow-lg" : ""}`}>
                    <button
                        onClick={() => {
                            setShowingProgramMenu(!showingProgramMenu);
                            setShowingWorkoutMenu(false);
                        }}
                        className="hover:font-bold cursor-pointer">
                        Programs
                    </button>
                    {showingProgramMenu && <ProgramMenu />}
                </li>
                <li className={`relative z-50 p-1 ${showingWorkoutMenu ? "bg-white rounded-t shadow-lg" : ""}`}>
                    <button
                        onClick={() => {
                            setShowingWorkoutMenu(!showingWorkoutMenu);
                            setShowingProgramMenu(false);
                        }}
                        className="hover:font-bold cursor-pointer">
                        Workouts
                    </button>
                    {showingWorkoutMenu && <WorkoutMenu />}
                </li>
            </ul>
            <button onClick={logout} className="rounded p-1 cursor-pointer ml-auto hover:bg-red-200" title="Log out"><LogOut /></button>
        </div>
    )
}