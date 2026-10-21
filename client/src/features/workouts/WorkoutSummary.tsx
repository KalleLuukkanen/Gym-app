import type { ExerciseData, WorkoutData } from "../../types/types";
import { getByWorkout } from "../../api/exerciseApi";
import { useState, useEffect } from "react";
import { capitalize } from "../../utils/helpers";

function WorkoutSummary({ workout }: { workout: WorkoutData }) {

    const [showing, setShowing] = useState(false);
    const [exercises, setExercises] = useState<ExerciseData[] | null>(null);
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const exercises_tmp = await getByWorkout(workout.id);
                if (!cancelled) setExercises(exercises_tmp);
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
    }, [workout.id]);

    if (loading) return <p>Loading exercises...</p>
    if (errorMessage) return <p>{errorMessage}</p>
    if (exercises?.length === 0) return <p>This workout doesn't seem to contain any exercises...</p>

    return (
        <>
            <button className="text-lg w-fit cursor-pointer hover:font-bold" onClick={() => setShowing(!showing)}>{capitalize(workout.day)}: {workout.name}</button>
            {showing &&
                <ul className="flex flex-wrap gap-2">
                    {exercises?.map((e) => (
                        <li className="border p-1 rounded border-gray-300">
                            <p>{e.position}. {e.name}</p>
                            <p>{e.target_sets}x{e.min_reps}-{e.max_reps}</p>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}

export default WorkoutSummary;