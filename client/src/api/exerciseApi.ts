import type { ExerciseInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/exercises`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get all your exercises, please try again later");
    }
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get all this exercise, please try again later");
    }
    return await response.json();
};

const getByWorkout = async (workout_id: number) => {
    const response = await fetch(`${BASE_URL}/workout/${workout_id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get exercises, please try again later");
    }
    return await response.json();
};

const create = async (workout_id: number, exercise: ExerciseInput) => {
    const response = await fetch(`${BASE_URL}/${workout_id}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise),
    });
    if (!response.ok) {
        throw new Error("Failed to create exercise, please try again later");
    }
    return await response.json();
};

const modify = async (id: number, target_sets: number, min_reps: number, max_reps: number) => {
    const response = await fetch(`${BASE_URL}/${id}/modify`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_sets, min_reps, max_reps }),
    });
    if (!response.ok) {
        throw new Error("Failed to modify this exercise, please try again later");
    }
    return await response.json();
};

const changeName = async (id: number, name: string) => {
    const response = await fetch(`${BASE_URL}/${id}/name`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to change this exercise's name, please try again later");
    }
    return await response.json();
};

const changePosition = async (id: number, position: number) => {
    const response = await fetch(`${BASE_URL}/${id}/position`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position }),
    });
    if (!response.ok) {
        throw new Error("Failed to change the position of this exercise, please try again later");
    }
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete this exercise, please try again later");
    }
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete all exercises, please try again later");
    }
    return await response.json();
};

export { getAll, getByWorkout, getOne, create, modify, changeName, changePosition, deleteAll, deleteOne };