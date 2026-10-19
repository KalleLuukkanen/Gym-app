import type { WorkoutInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/workouts`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get all your workouts, please try again later");
    }
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get this workout, please try again later");
    }
    return await response.json();
};

const getByProgram = async (program_id: number) => {
    const response = await fetch(`${BASE_URL}/program/${program_id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get workouts, please try again later");
    }
    return await response.json();
};

const getByDay = async (program_id: number, day: string) => {
    const response = await fetch(`${BASE_URL}/program/${program_id}/${day}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get this day's workout, please try again later");
    }
    return await response.json();
};

const create = async (program_id: number, workout: WorkoutInput) => {
    const response = await fetch(`${BASE_URL}/${program_id}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
    });
    if (!response.ok) {
        throw new Error("Failed to create workout, please try again later");
    }
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete this workout, please try again later");
    }
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete all workouts, please try again later");
    }
    return await response.json();
};

export { getAll, getByDay, getByProgram, getOne, create, deleteAll, deleteOne };