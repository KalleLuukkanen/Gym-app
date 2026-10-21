import type { ProgramData } from "../../types/types";
import { getByProgram } from "../../api/workoutApi";
import { useState, useEffect } from "react";
import type { WorkoutData } from "../../types/types";
import WorkoutSummary from "../workouts/WorkoutSummary";

function Program({ program }: { program: ProgramData }) {

    const [workouts, setWorkouts] = useState<WorkoutData[] | null>(null);
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const workouts_tmp = await getByProgram(program.id);
                if (!cancelled) setWorkouts(workouts_tmp);
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
        }
        load();
        return () => { cancelled = true };
    }, [program.id]);

    if (loading) return <p className="text-xl">Loading...</p>
    if (errorMessage) return <p className="text-xl">{errorMessage}</p>
    if (workouts?.length === 0) return <p className="text-xl">Your program doesn't seem to contain any workouts, make sure to add some or create a new active program.</p>

    return (
        <div className="flex flex-col space-y-4">
            <p className="text-xl">{program.name}</p>
            <ul className="flex flex-col space-y-2 ml-2">
                {workouts?.map((w) => (
                    <li key={w.id} className="flex flex-col space-y-2">
                        <WorkoutSummary workout={w} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Program;