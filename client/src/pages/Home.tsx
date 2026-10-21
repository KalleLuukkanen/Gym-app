import { useEffect, useState } from "react";
import { getByDay } from "../api/workoutApi";
import { getCurrent } from "../api/programApi";
import type { ProgramData, WorkoutData } from "../types/types";
import Loading from "../components/Loading";
import Workout from "../features/workouts/Workout";
import Program from "../features/programs/Program";

export default function Home() {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    const [program, setProgram] = useState<ProgramData | null>(null);
    const [workout, setWorkout] = useState<WorkoutData | null>(null);
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const p = await getCurrent();
                if (cancelled) return;
                setProgram(p);

                if (p) {
                    const w = await getByDay(p.id, weekday);
                    if (!cancelled) setWorkout(w);
                } else {
                    setWorkout(null);
                }
            } catch (error) {
                if (!cancelled) {
                    if (error instanceof Error) {
                        setErrorMessage(error.message);
                    } else {
                        setErrorMessage("Unknown error in the system, please try again later")
                    }
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true };
    }, [weekday]);

    if (loading) {
        <Loading />
    }

    if (errorMessage) {
        return (
            <div className="rounded shadow p-4 w-fit">
                <p className="text-2xl">{errorMessage}</p>
            </div>
        )
    }

    if (!program) {
        return (
            <div className="flex flex-col rounded shadow p-4 w-fit space-y-2">
                <p className="text-2xl">You do not have an active program currently.</p>
                <p className="text-2xl">Create one <a href="/programs/new" className="text-blue-500 hover:underline">here </a>
                    or make one of your programs active <a href="/programs" className="text-blue-500 hover:underline">here</a>.
                    Or browse public programs <a href="/programs/public" className="text-blue-500 hover:underline">here</a>.</p>
            </div>
        )
    }

    return (
        <div className="sm:grid sm:grid-cols-2 gap-2 flex flex-col">
            <div className="flex flex-col rounded shadow p-4 space-y-6">
                {!workout ? <p className="text-2xl my-6">No workout today!</p> :
                    <div className="flex flex-col space-y-6">
                        <p className="text-2xl">Todays workout:</p>
                        <div>
                            <Workout workout={workout} />
                        </div>
                    </div>
                }
            </div>
            <div className="flex flex-col rounded shadow p-4 space-y-6">
                <p className="text-2xl">Current program:</p>
                <Program program={program} />
            </div>
        </div>
    )
}