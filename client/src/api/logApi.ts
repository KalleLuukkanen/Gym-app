import type { LogData, LogInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/logs`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get all your exercise logs, please try again later");
    }
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get this log, please try again later");
    }
    return await response.json();
};

const getBySession = async (session_id: number): Promise<LogData[]> => {
    const response = await fetch(`${BASE_URL}/session/${session_id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get this session's logs, please try again later");
    }
    return (await response.json()) as LogData[];
};

const getByExercise = async (exercise_id: number) => {
    const response = await fetch(`${BASE_URL}/exercise/${exercise_id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to this exercise's logs, please try again later");
    }
    return await response.json();
};

const create = async (log: LogInput) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
    });
    if (!response.ok) {
        throw new Error("Failed to create log, please try again later");
    }
    return await response.json();
};

const modify = async (id: number, set_number: number, reps: number, weight: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set_number, reps, weight }),
    });
    if (!response.ok) {
        throw new Error("Failed to modify log, please try again later");
    }
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete this log, please try again later");
    }
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete all logs, please try again later");
    }
    return await response.json();
};

const updateOrCreateWeight = async (weight: number, set_number: number, exercise_id: number, session_id: number): Promise<LogData> => {
    const response = await fetch(`${BASE_URL}/weight`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, set_number, exercise_id, session_id }),
    });
    if (!response.ok) {
        throw new Error("Couldn't save weight of this exercise, please try again later");
    }
    return (await response.json()) as LogData;
};

const updateOrCreateReps = async (reps: number, set_number: number, exercise_id: number, session_id: number): Promise<LogData> => {
    const response = await fetch(`${BASE_URL}/reps`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reps, set_number, exercise_id, session_id }),
    });
    if (!response.ok) {
        throw new Error("Couldn't save reps of this exercise, please try again later");
    }
    return (await response.json()) as LogData;
};

export { getAll, getByExercise, getBySession, getOne, create, modify, deleteAll, deleteOne, updateOrCreateReps, updateOrCreateWeight };