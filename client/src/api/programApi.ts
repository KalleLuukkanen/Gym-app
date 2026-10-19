import type { ProgramInput, WorkoutInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/programs`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const getPublic = async () => {
    const response = await fetch(`${BASE_URL}/public`, {
        credentials: "include",
    });
    return await response.json();
};

const getCurrent = async () => {
    const response = await fetch(`${BASE_URL}/current`, {
        credentials: "include",
    });
    return await response.json();
};

const getArchived = async () => {
    const response = await fetch(`${BASE_URL}/archived`, {
        credentials: "include",
    });
    return await response.json();
};

const getNonArchived = async () => {
    const response = await fetch(`${BASE_URL}/nonarchived`, {
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

const create = async (program: ProgramInput) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(program),
    });
    return await response.json();
};

const updateName = async (id: number, name: string) => {
    const response = await fetch(`${BASE_URL}/${id}/name`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    return await response.json();
};

const setActive = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/active`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

const setInActive = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/inactive`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

const setPublic = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/public`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

const setPrivate = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/private`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

const archive = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/archive`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
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

const createProgram = async (program: ProgramInput, workouts: WorkoutInput[]) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...program, workouts }),
    });
    return await response.json();
};

export { getAll, getOne, getArchived, getCurrent, getNonArchived, getPublic, create, updateName, setActive, setInActive, setPrivate, setPublic, archive, deleteAll, deleteOne, createProgram };