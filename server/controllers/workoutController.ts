import * as workoutRepository from "../repositories/workoutRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workouts = await workoutRepository.getAll(user_id);
    return res.status(200).json(workouts);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const workout = await workoutRepository.getOne(user_id, id);
    if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
    }
    return res.status(200).json(workout);
};

const getByProgram = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const program_id = Number(req.params.programId);
    if (!Number.isInteger(program_id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const workouts = await workoutRepository.getByProgram(user_id, program_id);
    return res.status(200).json(workouts);
};

const getByPosition = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const program_id = Number(req.params.programId);
    if (!Number.isInteger(program_id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const { position } = req.body;
    if (!Number.isInteger(Number(position))) {
        return res.status(400).json({ error: "Invalid position" });
    }
    const workout = await workoutRepository.getByPosition(user_id, Number(position), program_id);
    if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
    }
    return res.status(200).json(workout);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const program_id = Number(req.params.programId);
    if (!Number.isInteger(program_id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const { name, position } = req.body;
    if (!(name || position)) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const createdWorkout = await workoutRepository.create(user_id, name, position, program_id);
    if (!createdWorkout) {
        return res.status(404).json({ error: "Error creating workout" });
    }
    return res.status(200).json(createdWorkout);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deletedWorkouts = await workoutRepository.deleteAll(user_id);
    return res.status(200).json(deletedWorkouts);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const deletedWorkout = await workoutRepository.deleteOne(user_id, id);
    if (!deletedWorkout) {
        return res.status(404).json({ error: "Workout couldn't be deleted" });
    }
    return res.status(200).json(deletedWorkout);
};

export { getAll, getOne, getByProgram, getByPosition, create, deleteAll, deleteOne };