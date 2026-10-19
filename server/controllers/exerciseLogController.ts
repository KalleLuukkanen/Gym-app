import * as exerciseLogRepository from "../repositories/exerciseLogRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const logs = await exerciseLogRepository.getAll(user_id);
    return res.status(200).json(logs);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.exerciseLogId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid log id" });
    }
    const log = await exerciseLogRepository.getOne(user_id, id);
    if (!log) {
        return res.status(404).json({ error: "Exercise log not found" });
    }
    return res.status(200).json(log);
};

const getBySession = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const session_id = Number(req.params.sessionId);
    if (!Number.isInteger(session_id)) {
        return res.status(400).json({ error: "Invalid session id" });
    }
    const logs = await exerciseLogRepository.getBySession(user_id, session_id);
    return res.status(200).json(logs);
};

const getByExercise = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const exercise_id = Number(req.params.exerciseId);
    if (!Number.isInteger(exercise_id)) {
        return res.status(400).json({ error: "Invalid exercise id" });
    }
    const logs = await exerciseLogRepository.getByExercise(user_id, exercise_id);
    return res.status(200).json(logs);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const { session_id, exercise_id, set_number, reps, weight } = req.body;
    if (!(session_id && exercise_id && set_number && reps && weight)) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const createdLog = await exerciseLogRepository.create(user_id, exercise_id, session_id, set_number, reps, weight);
    if (!createdLog) {
        return res.status(404).json({ error: "The log couldn't be created" });
    }
    return res.status(200).json(createdLog);
};

const modify = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.exerciseLogId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid log id" });
    }
    const { set_number, reps, weight } = req.body;
    if (!(set_number && reps && weight)) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const updatedLog = await exerciseLogRepository.modify(user_id, set_number, reps, weight);
    if (!updatedLog) {
        return res.status(404).json({ error: "The log couldn't be modified" });
    }
    return res.status(200).json(updatedLog);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.exerciseLogId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid log id" });
    }
    const deletedLog = await exerciseLogRepository.deleteOne(user_id, id);
    if (!deletedLog) {
        return res.status(404).json({ error: "The log couldn't be deleted" });
    }
    return res.status(200).json(deletedLog);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deletedLogs = await exerciseLogRepository.deleteAll(user_id);
    return res.status(200).json(deletedLogs);
};



export { getAll, getOne, getBySession, getByExercise, create, modify, deleteOne, deleteAll };