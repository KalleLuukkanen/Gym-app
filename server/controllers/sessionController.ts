import { Request, Response } from "express";
import * as sessionRepository from "../repositories/sessionRepository.js";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const sessions = await sessionRepository.getAll(user_id);
    return res.status(200).json(sessions);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.sessionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid session id" });
    }
    const session = await sessionRepository.getOne(user_id, id);
    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }
    return res.status(200).json(session);
};

const getByWorkout = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workout_id = Number(req.params.workoutId);
    if (!Number.isInteger(workout_id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const sessions = await sessionRepository.getByWorkout(user_id, workout_id);
    return res.status(200).json({ sessions });
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workout_id = Number(req.params.workoutId);
    if (!Number.isInteger(workout_id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const { date, notes } = req.body;
    if (!date) {
        return res.status(400).json({ error: "Missing session date" });
    }
    const createdSession = await sessionRepository.create(user_id, workout_id, date, notes ?? null);
    if (!createdSession) {
        return res.status(404).json({ error: "Session couldn't be created" });
    }
    return res.status(200).json(createdSession);
};

const changeDate = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.sessionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid session id" });
    }
    const { date } = req.body;
    if (!date) {
        return res.status(400).json({ error: "Missing session date" });
    }
    const updatedSession = await sessionRepository.changeDate(user_id, id, date);
    if (!updatedSession) {
        return res.status(404).json({ error: "Session couldn't be updated" });
    }
    return res.status(200).json(updatedSession);
};

const addNotes = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.sessionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid session id" });
    }
    const { notes } = req.body;
    if (!notes) {
        return res.status(400).json({ error: "Missing session notes" });
    }
    const updatedSession = await sessionRepository.addNotes(user_id, id, notes);
    if (!updatedSession) {
        return res.status(404).json({ error: "Session couldn't be updated" });
    }
    return res.status(200).json(updatedSession);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.sessionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid session id" });
    }
    const deletedSession = await sessionRepository.deleteOne(user_id, id);
    if (!deletedSession) {
        return res.status(404).json({ error: "Session couldn't be deleted" });
    }
    return res.status(200).json(deletedSession);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deletedSessions = await sessionRepository.deleteAll(user_id);
    return res.status(200).json(deletedSessions);
};

const startSession = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workout_id = Number(req.params.workoutId);
    if (!Number.isInteger(workout_id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const { date } = req.body;
    if (!date) {
        return res.status(400).json({ error: "Missing session date" });
    }
    const startedSession = await sessionRepository.startSession(user_id, workout_id, date);
    if (!startedSession) {
        return res.status(404).json({ error: "Session couldn't be started" });
    }
    return res.status(200).json(startedSession);
};

const endSession = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workout_id = Number(req.params.workoutId);
    if (!Number.isInteger(workout_id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const { notes } = req.body;
    const finishedSession = await sessionRepository.endSession(user_id, workout_id, notes ?? null);
    if (!finishedSession) {
        return res.status(404).json({ error: "Session couldn't be created" });
    }
    return res.status(200).json(finishedSession);
};

export { getAll, getByWorkout, getOne, create, changeDate, addNotes, deleteAll, deleteOne, startSession, endSession };