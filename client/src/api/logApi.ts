import type { LogInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/logs`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    return await response.json();
};

const getBySession = async (session_id: number) => {
    const response = await fetch(`${BASE_URL}/session/${session_id}`, {
        credentials: "include",
    });
    return await response.json();
};

const getByExercise = async (exercise_id: number) => {
    const response = await fetch(`${BASE_URL}/exercise/${exercise_id}`, {
        credentials: "include",
    });
    return await response.json();
};

const create = async (log: LogInput) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
    });
    return await response.json();
};

const modify = async (id: number, set_number: number, reps: number, weight: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set_number, reps, weight }),
    });
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

export { getAll, getByExercise, getBySession, getOne, create, modify, deleteAll, deleteOne };