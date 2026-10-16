import { Request, Response } from "express";
import * as exerciseRepository from "../repositories/exerciseRepository.js";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const exercises = await exerciseRepository.getAll(user_id);
    return res.status(200).json(exercises);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutExerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout exercise id" });
    }
    const exercise = await exerciseRepository.getOne(user_id, id);
    if (!exercise) {
        return res.status(200).json(exercise);
    }
    return res.status(200).json(exercise);
};

const getByWorkout = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workout_id = Number(req.params.workoutId);
    if (!Number.isInteger(workout_id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const exercises = await exerciseRepository.getByWorkout(user_id, workout_id);
    return res.status(200).json(exercises);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const workout_id = Number(req.params.workoutId);
    if (!Number.isInteger(workout_id)) {
        return res.status(400).json({ error: "Invalid workout id" });
    }
    const { name, position, target_sets, min_reps, max_reps } = req.body;
    if (!(name || position || target_sets || min_reps || max_reps)) {
        return res.status(400).json("Missing required parameters");
    }
    const createdExercise = await exerciseRepository.create(user_id, name, position, target_sets, min_reps, max_reps, workout_id);
    if (!createdExercise) {
        return res.status(404).json({ error: "Exercise couldn't be created" });
    }
    return res.status(200).json(createdExercise);
};

const modify = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutExerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout exercise id" });
    }
    const { target_sets, min_reps, max_reps } = req.body;
    if (!(target_sets || min_reps || max_reps)) {
        return res.status(400).json("Missing required parameters");
    }
    const updatedExercise = await exerciseRepository.modify(user_id, id, target_sets, min_reps, max_reps);
    if (!updatedExercise) {
        return res.status(404).json({ error: "Exercise couldn't be updated" });
    }
    return res.status(200).json(updatedExercise);
};

const changeName = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutExerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout exercise id" });
    }
    const { name } = req.body;
    if (!name) {
        return res.status(400).json("Missing required parameters");
    }
    const updatedExercise = await exerciseRepository.changeName(user_id, id, name);
    if (!updatedExercise) {
        return res.status(404).json({ error: "Exercise couldn't be updated" });
    }
    return res.status(200).json(updatedExercise);
};

const changePosition = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutExerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout exercise id" });
    }
    const { position } = req.body;
    if (!position) {
        return res.status(400).json("Missing required parameters");
    }
    const updatedExercise = await exerciseRepository.changeName(user_id, id, position);
    if (!updatedExercise) {
        return res.status(404).json({ error: "Exercise couldn't be updated" });
    }
    return res.status(200).json(updatedExercise);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.workoutExerciseId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid workout exercise id" });
    }
    const deletedExercise = await exerciseRepository.deleteOne(user_id, id);
    if (!deletedExercise) {
        return res.status(404).json({ error: "Exercise couldn't be deleted" });
    }
    return res.status(200).json(deletedExercise);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deletedExercises = await exerciseRepository.deleteAll(user_id);
    return res.status(200).json(deletedExercises);
};

export { getAll, getOne, getByWorkout, create, modify, changeName, changePosition, deleteOne, deleteAll };