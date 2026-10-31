import type { ProgramInput, WorkoutInput, ProgramData } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/programs`;

const getAll = async (): Promise<ProgramData[]> => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get all your programs, please try again later");
    }
    return (await response.json()) as ProgramData[];
};

const getPublic = async () => {
    const response = await fetch(`${BASE_URL}/public`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch public programs, please try again later");
    }
    return await response.json();
};

const getCurrent = async () => {
    const response = await fetch(`${BASE_URL}/current`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get your current program, please try again later");
    }
    return await response.json();
};

const getArchived = async () => {
    const response = await fetch(`${BASE_URL}/archived`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch the archived programs, please try again later");
    }
    return await response.json();
};

const getNonArchived = async () => {
    const response = await fetch(`${BASE_URL}/nonarchived`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch the non-archived programs, please try again later");
    }
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch this program, please try again later");
    }
    return await response.json();
};

const create = async (program: ProgramInput) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(program),
    });
    if (!response.ok) {
        throw new Error("Failed to create the program, please try again later");
    }
    return await response.json();
};

const updateName = async (id: number, name: string) => {
    const response = await fetch(`${BASE_URL}/${id}/name`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error("Failed to update program's name, please try again later");
    }
    return await response.json();
};

const setActive = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/active`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to set the program as active, please try again later");
    }
    return await response.json();
};

const setInActive = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/inactive`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to set the program as inactive, please try again later");
    }
    return await response.json();
};

const setPublic = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/public`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to set the program public, please try again later");
    }
    return await response.json();
};

const setPrivate = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/private`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to set the program private, please try again later");
    }
    return await response.json();
};

const archive = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/archive`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to archive the program, please try again later");
    }
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete the program, please try again later");
    }
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete all programs, please try again later");
    }
    return await response.json();
};

const createProgram = async (program: ProgramInput, workouts: WorkoutInput[]) => {
    const response = await fetch(`${BASE_URL}/program`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...program, workouts }),
    });
    if (!response.ok) {
        throw new Error("Failed to create program, please try again later");
    }
    return await response.json();
};

export { getAll, getOne, getArchived, getCurrent, getNonArchived, getPublic, create, updateName, setActive, setInActive, setPrivate, setPublic, archive, deleteAll, deleteOne, createProgram };