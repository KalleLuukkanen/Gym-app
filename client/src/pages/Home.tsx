import { useEffect, useState } from "react";
import { getByDay, getOne } from "../api/workoutApi";
import { getCurrent } from "../api/programApi";
import { getStartedAll, finishAll, endSession } from "../api/sessionApi";
import type { ProgramData, WorkoutData, SessionData } from "../types/types";
import Loading from "../components/Loading";
import Workout from "../features/workouts/Workout";
import Program from "../features/programs/Program";
import WorkoutOption from "../features/workouts/WorkoutOption";
import CustomWorkout from "../features/workouts/CustomWorkout";

export default function Home() {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    const [program, setProgram] = useState<ProgramData | null>(null);
    const [workout, setWorkout] = useState<WorkoutData | null>(null);
    const [loading, setLoading] = useState(true);


    const [errorMessage, setErrorMessage] = useState("");

    const [custom, setCustom] = useState(false);

    const [startedSessions, setStartedSessions] = useState<SessionData[]>([]);
    const [unfinishedWorkout, setUnfinishedWorkout] = useState<WorkoutData | null>(null);
    const [continueWorkout, setContinueWorkout] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const startedSessions_tmp = await getStartedAll();
                if (startedSessions_tmp.length > 0) {
                    setStartedSessions(startedSessions_tmp);
                    const startedWorkout = await getOne(startedSessions_tmp[0].workout_id);
                    setUnfinishedWorkout(startedWorkout);
                }

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

    const changeWorkout = async (id: number | null) => {
        if (id) {
            try {
                const w = await getOne(id);
                setWorkout(w);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Unknown error in the system, please try again later")
                }
            }
        } else {
            setCustom(true);
        }
    };

    if (loading) {
        return <Loading />
    }

    if (errorMessage) {
        return (
            <div className="rounded shadow p-4 w-fit">
                <p className="text-2xl">{errorMessage}</p>
            </div>
        )
    }

    if (startedSessions.length > 0 && !continueWorkout) {
        if (startedSessions.length === 1) {
            return (
                <div className="flex flex-col rounded shadow p-4 w-fit space-y-2">
                    <p className="text-2xl">Looks like you have an unfinished workout, a {unfinishedWorkout?.name} workout started {new Date(startedSessions[0].started_at).toLocaleDateString("fi-FI")}.</p>
                    <p className="text-2xl">Do you wish to continue it?</p>
                    <div className="flex ml-2 mt-4 w-fit">
                        <button
                            className="w-fit text-xl cursor-pointer border-r border-2 p-2 rounded-l"
                            onClick={() => {
                                setStartedSessions([]);
                                setContinueWorkout(false);
                            }}
                        >
                            No
                        </button>
                        <button
                            className="w-fit text-xl cursor-pointer border-2 p-2"
                            onClick={() => {
                                endSession(startedSessions[0].id, null);
                                setStartedSessions([]);
                                setContinueWorkout(false);
                            }}
                        >
                            No, and you can mark it as finished
                        </button>
                        <button
                            className="w-fit text-xl cursor-pointer border-l border-2 p-2 rounded-r"
                            onClick={() => {
                                setWorkout(unfinishedWorkout);
                                setContinueWorkout(true);
                            }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col rounded shadow p-4 w-fit space-y-2">
                    <p className="text-2xl">Looks like you have {startedSessions.length} unfinished workout(s).</p>
                    <p className="text-2xl">The latest is a {unfinishedWorkout?.name} workout started on {new Date(startedSessions[0].started_at).toLocaleDateString("fi-FI")}</p>
                    <p className="text-2xl">Do you wish to continue the latest workout?</p>
                    <div className="flex ml-2 mt-4 w-fit">
                        <button
                            className="w-fit text-xl cursor-pointer border-r border-2 p-2 rounded-l"
                            onClick={() => {
                                setStartedSessions([]);
                                setContinueWorkout(false);
                            }}
                        >
                            No
                        </button>
                        <button
                            className="w-fit text-xl cursor-pointer border-2 p-2"
                            onClick={() => {
                                finishAll();
                                setStartedSessions([]);
                                setContinueWorkout(false);
                            }}
                        >
                            No, and you can mark all as finished
                        </button>
                        <button
                            className="w-fit text-xl cursor-pointer border-l border-2 p-2 rounded-r"
                            onClick={() => {
                                setWorkout(unfinishedWorkout);
                                setContinueWorkout(true);
                            }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            )
        }

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
                {custom ? <CustomWorkout /> :
                    <>
                        {!workout ? <WorkoutOption program_id={program.id} onChange={changeWorkout} /> :
                            <div className="flex flex-col space-y-6">
                                <div className="flex">
                                    <p className="text-2xl">Todays workout:</p>
                                    <button
                                        className="ml-auto text-lg cursor-pointer"
                                        type="button"
                                        onClick={() => setCustom(true)}
                                    >
                                        Custom
                                    </button>
                                </div>
                                <Workout workout={workout} session_id={startedSessions[0]?.id ?? null} />
                            </div>
                        }
                    </>
                }
            </div>
            <div className="flex flex-col rounded shadow p-4 space-y-6">
                <p className="text-2xl">Current program:</p>
                <Program program={program} />
            </div>
        </div>
    )
}