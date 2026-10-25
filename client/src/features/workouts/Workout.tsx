import type { WorkoutData, ExerciseData, SessionData } from "../../types/types";
import { getByWorkout } from "../../api/exerciseApi";
import React, { useState, useEffect } from "react";
import { startSession } from "../../api/sessionApi";

function Workout({ workout }: { workout: WorkoutData }) {

    const [exercises, setExercises] = useState<ExerciseData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<SessionData | null>(null);

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

    const [sessionStarted, setSessionStarted] = useState(false);

    const start = async () => {
        try {
            const session_tmp = await startSession(workout.id, new Date().toDateString());
            setSession(session_tmp);
            setSessionStarted(true);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Unknown error in the system, please try again later")
            }
        }
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };


    if (loading) return <p>Loading exercises...</p>
    if (errorMessage) return <p>{errorMessage}</p>
    if (exercises?.length === 0) return <p>This workout doesn't seem to contain any exercises...</p>

    if (!sessionStarted) {
        return (
            <>
                <p className="text-lg">Click to start your {workout.name} workout:</p>
                <button className="w-fit text-lg cursor-pointer p-1 border border-gray-500 p-1 rounded" onClick={start}>Start workout</button>
            </>
        )
    }

    return (
        <form className="flex flex-col space-y-4" onSubmit={handleForm}>
            <span className="text-xl">{workout.name}</span>
            {exercises?.map((e) => (
                <div className="flex flex-col space-y-2">
                    <span className="text-lg">{e.position}. {e.name}</span>
                    <ul className="flex space-x-2">
                        {Array.from({ length: e.target_sets }, (_, i) => (
                            <label key={i} className="flex space-x-1 items-center justify-center">
                                <span>Set {i + 1}:</span>
                                <input
                                    type="number"
                                    className="w-16 border border-gray-300 rounded p-1"
                                    placeholder={`${e.min_reps}-${e.max_reps}`}
                                />
                            </label>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="flex">
                <label className="flex flex-col space-y-2">
                    <span className="text-lg">Notes:</span>
                    <textarea
                        className="border border-gray-500 rounded p-0.5 w-64"
                    />
                </label>
                <button type="submit" className="ml-auto rounded cursor-pointer bg-gray-300 p-2">Finish workout</button>
            </div>
        </form>
    )
}

export default Workout;