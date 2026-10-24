import { useEffect, useState } from "react";
import type { WorkoutData } from "../../types/types";
import { getByProgram } from "../../api/workoutApi";

function WorkoutOption({ program_id, onChange }: { program_id: number, onChange(id: number | null): Promise<void> }) {

    const [workouts, setWorkouts] = useState<WorkoutData[] | null>(null);
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const workouts_tmp = await getByProgram(program_id);
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
    }, [program_id]);


    if (loading) return <p className="text-xl">Loading...</p>
    if (errorMessage) return <p className="text-xl">{errorMessage}</p>
    if (workouts?.length === 0) return <p className="text-xl">Your program doesn't seem to contain any workouts, make sure to add some or create a new active program.</p>

    return (
        <div className="flex flex-col space-y-6">
            <p className="text-2xl">No workout today!</p>
            <p className="text-xl">But, if there's a change in your program, you can still workout:</p>
            <ul className="flex flex-wrap gap-4">
                {workouts?.map((w) => (
                    <button
                        key={w.id}
                        className="border p-2 rounded text-xl cursor-pointer"
                        onClick={() => onChange(w.id)}
                    >
                        {w.name}
                    </button>
                ))}
                <button
                    className="border p-2 rounded text-xl cursor-pointer"
                    onClick={() => onChange(null)}
                >
                    Custom workout
                </button>
            </ul>
        </div>
    )
}

export default WorkoutOption;