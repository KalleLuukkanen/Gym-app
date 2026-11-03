import type { ProgramData } from "../../types/types";
import { getByProgramPublic } from "../../api/workoutApi";
import { useState, useEffect } from "react";
import type { WorkoutData } from "../../types/types";
import WorkoutSummary from "../workouts/WorkoutSummary";

function PublicProgram({ program }: { program: ProgramData }) {

    const [workouts, setWorkouts] = useState<WorkoutData[] | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const workouts_tmp = await getByProgramPublic(program.id);
                if (!cancelled) setWorkouts(workouts_tmp);
            } catch (error) {
                if (!cancelled) {
                    if (error instanceof Error) {
                        alert(error.message);
                    } else {
                        alert("Unknown error in the system, please try again later")
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
            <p >Created: {new Date(program.created_at).toLocaleDateString("fi-FI")}</p>
        </div>
    )
}

export default PublicProgram;