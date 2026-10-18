import type { SessionInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/sessions/`;

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

const getByWorkout = async (workout_id: number) => {
    const response = await fetch(`${BASE_URL}/workout(${workout_id}`, {
        credentials: "include",
    });
    return await response.json();
};

const create = async (workout_id: number, session: SessionInput) => {
    const response = await fetch(`${BASE_URL}/workout(${workout_id}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
    });
    return await response.json();
};

const changeDate = async (id: number, date: string) => {
    const response = await fetch(`${BASE_URL}/${id}/date`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
    });
    return await response.json();
};

const addNotes = async (id: number, notes: string) => {
    const response = await fetch(`${BASE_URL}/${id}/notes`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
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

export { getAll, getByWorkout, getOne, create, changeDate, addNotes, deleteAll, deleteOne };