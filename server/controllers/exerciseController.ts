import * as exerciseRepository from "../repositories/exerciseRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const exercises = await exerciseRepository.getAll(user_id);
    return res.status(200).json(exercises);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.exerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid exercise id" });
    }
    const exercise = await exerciseRepository.getOne(user_id, id);
    if (!exercise) {
        return res.status(404).json({ error: "Exercise couldn't be found" });
    }
    return res.status(200).json(exercise);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Missing exercise name" });
    }
    const createdExercise = await exerciseRepository.create(user_id, name);
    if (!createdExercise) {
        return res.status(404).json({ error: "Exercise couldn't be created" });
    }
    return res.status(200).json(createdExercise);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.exerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid exercise id" });
    }
    const deletedExercise = await exerciseRepository.deleteOne(user_id, id);
    if (!deletedExercise) {
        return res.status(404).json({ error: "Exercise couldn't be deleted" });
    }
    return res.status(200).json(deletedExercise);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).usrId;
    const deletedExercises = await exerciseRepository.deleteAll(user_id);
    return res.status(200).json(deletedExercises);
};

export { getAll, getOne, create, deleteAll, deleteOne };