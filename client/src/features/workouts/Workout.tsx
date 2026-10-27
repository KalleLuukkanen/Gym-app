import type { WorkoutData, ExerciseData, SessionData, LogInput } from "../../types/types";
import { getByWorkout } from "../../api/exerciseApi";
import { useState, useEffect } from "react";
import { endSession, startSession, getOne } from "../../api/sessionApi";
import { updateOrCreateReps, updateOrCreateWeight, getBySession } from "../../api/logApi";

function Workout({ workout, session_id }: { workout: WorkoutData, session_id: number | null }) {

    const [exercises, setExercises] = useState<ExerciseData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<SessionData | null>(null);
    const [sessionStarted, setSessionStarted] = useState(false);
    // exerciseDetails Map ( exercise_id -> Map(set -> [weight, reps]) )
    const [exerciseDetails, setExerciseDetails] = useState(new Map<number, Map<number, (number | null)[]>>());
    const [notes, setNotes] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const exercises_tmp = await getByWorkout(workout.id);
                if (!cancelled) {
                    setExercises(exercises_tmp);
                    if (session_id) {
                        const continuedSession = await getOne(session_id);
                        const prevSessionLogs = await getBySession(session_id);
                        for (const log of prevSessionLogs) {
                            setExerciseDetails((prev) => {
                                const next = new Map(prev);
                                const exerciseDetails =
                                    new Map(next.get(log.exercise_id) ?? new Map<number, number[]>());
                                exerciseDetails.set(log.set_number, [log.weight, log.reps]);
                                next.set(log.exercise_id, exerciseDetails);
                                return next;
                            })
                        }
                        setSession(continuedSession);
                        setSessionStarted(true);
                    }

                };
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

    const finish = async () => {
        if (session) {
            try {
                await endSession((session as SessionData).id, notes);
                setSession(null);
                setSessionStarted(false);

            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Unknown error in the system, please try again later")
                }
            }
        }
    };

    const updateWeight = async (set_number: number, exercise_id: number, weight: number | null) => {
        if (!session) return;

        setExerciseDetails(prev => {
            const next = new Map(prev);
            const details = new Map(next.get(exercise_id) ?? new Map());

            const prevReps = details.get(set_number)?.[1] ?? null;

            details.set(set_number, [weight, prevReps]);
            next.set(exercise_id, details);

            return next;
        });

        if (!weight) return;

        try {
            await updateOrCreateWeight(
                weight ?? 0,
                set_number,
                exercise_id,
                session.id
            );
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Unknown error in the system, please try again later")
            }
        }
    };

    const updateReps = async (set_number: number, exercise_id: number, reps: number | null) => {
        if (!session) return;

        setExerciseDetails(prev => {
            const next = new Map(prev);
            const details = new Map(next.get(exercise_id) ?? new Map());

            const prevWeight = details.get(set_number)?.[0] ?? null;

            details.set(set_number, [prevWeight, reps]);
            next.set(exercise_id, details);

            return next;
        });

        if (!reps) return;

        try {
            await updateOrCreateReps(
                reps,
                set_number,
                exercise_id,
                session.id
            );
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Unknown error in the system, please try again later")
            }
        }
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
        <div className="flex flex-col space-y-4">
            <span className="text-xl">{workout.name}</span>
            {exercises?.map((ex) => (
                <div className="flex flex-col space-y-2 border rounded p-4" key={ex.id}>
                    <span className="text-lg">{ex.position}. {ex.name}</span>
                    <ul className="flex flex-wrap gap-6">
                        {Array.from({ length: ex.target_sets }, (_, i) => (
                            <fieldset key={i} className="flex space-x-1 items-center justify-center">
                                <legend>Set {i + 1}:</legend>
                                <label className="flex flex-col space-y-1">
                                    <span>Weight:</span>
                                    <input
                                        type="number"
                                        value={exerciseDetails?.get(ex.id)?.get(i + 1)?.[0] ?? ""}
                                        className="w-16 border border-gray-300 rounded p-1"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            updateWeight(i + 1, ex.id, (value === "" ? null : Number(value)))
                                        }}
                                        min="0"
                                    />
                                </label>
                                <label className="flex flex-col space-y-1">
                                    <span>Reps:</span>
                                    <input
                                        type="number"
                                        value={exerciseDetails?.get(ex.id)?.get(i + 1)?.[1] ?? ""}
                                        className="w-16 border border-gray-300 rounded p-1"
                                        placeholder={`${ex.min_reps}-${ex.max_reps}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            updateReps(i + 1, ex.id, (value === "" ? null : Number(value)));
                                        }}
                                    />
                                </label>
                            </fieldset>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="flex">
                <label className="flex flex-col space-y-2">
                    <span className="text-lg">Notes:</span>
                    <textarea
                        className="border border-gray-500 rounded p-0.5 w-64"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </label>
                <button type="button" className="ml-auto rounded cursor-pointer bg-gray-300 p-2" onClick={finish}>Finish workout</button>
            </div>
        </div>
    )
}

export default Workout;