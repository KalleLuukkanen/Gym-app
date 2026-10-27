import type { SessionData, SessionInput } from "../types/types";
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/sessions`;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get all your sessions, please try again later");
    }
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get this session, please try again later");
    }
    return await response.json();
};

const getByWorkout = async (workout_id: number) => {
    const response = await fetch(`${BASE_URL}/workout/${workout_id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get workout's sessions, please try again later");
    }
    return await response.json();
};

const create = async (workout_id: number, session: SessionInput) => {
    const response = await fetch(`${BASE_URL}/workout/${workout_id}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
    });
    if (!response.ok) {
        throw new Error("Failed to create session, please try again later");
    }
    return await response.json();
};

const changeDate = async (id: number, date: string) => {
    const response = await fetch(`${BASE_URL}/${id}/date`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
    });
    if (!response.ok) {
        throw new Error("Failed to change date of this session, please try again later");
    }
    return await response.json();
};

const addNotes = async (id: number, notes: string) => {
    const response = await fetch(`${BASE_URL}/${id}/notes`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
    });
    if (!response.ok) {
        throw new Error("Failed to add notes to session, please try again later");
    }
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete this session, please try again later");
    }
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete all sessions, please try again later");
    }
    return await response.json();
};

const startSession = async (workout_id: number, date: string) => {
    const response = await fetch(`${BASE_URL}/${workout_id}/start`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
    });
    if (!response.ok) {
        throw new Error("Failed to start session, please try again later");
    }
    return await response.json();
};

const endSession = async (session_id: number, notes: string | null) => {
    const response = await fetch(`${BASE_URL}/${session_id}/finish`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
    });
    if (!response.ok) {
        throw new Error("Failed to end session, please try again later");
    }
    return await response.json();
};

const getStarted = async (workout_id: number) => {
    const response = await fetch(`${BASE_URL}/${workout_id}/started`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get workout's started sessions, please try again later");
    }
    return await response.json();
};

const getStartedAll = async (): Promise<SessionData[]> => {
    const response = await fetch(`${BASE_URL}/started/all`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to get started sessions, please try again later");
    }
    return (await response.json()) as SessionData[];
};

const finishAllOfWorkout = async (workout_id: number) => {
    const response = await fetch(`${BASE_URL}/workout/${workout_id}/finish/all`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Failed to end sessions, please try again later");
    }
    return await response.json();
};

const finishAll = async () => {
    const response = await fetch(`${BASE_URL}/finish/all`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Failed to end sessions, please try again later");
    }
    return await response.json();
};

export { getAll, getByWorkout, getOne, create, changeDate, addNotes, deleteAll, deleteOne, startSession, endSession, getStarted, finishAll, getStartedAll, finishAllOfWorkout };