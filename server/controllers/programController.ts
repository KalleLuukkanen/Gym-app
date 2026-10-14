import { Request, Response } from "express";
import * as programRepository from "../repositories/programRepository.js";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const programs = await programRepository.getAll(user_id);
    return res.status(200).json(programs);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.programId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const program = await programRepository.getOne(user_id, id);
    if (!program) {
        return res.status(404).json({ error: "Program not found" });
    }
    return res.status(200).json(program);
};

const getCurrent = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const currentProgram = await programRepository.getCurrent(user_id);
    return res.status(200).json(currentProgram ?? null);
};

const getArchived = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const archivedPrograms = await programRepository.getArchived(user_id);
    return res.status(200).json(archivedPrograms);
};

const getNonArchived = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const nonArchivedPrograms = await programRepository.getNonArchived(user_id);
    return res.status(200).json(nonArchivedPrograms);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const program = req.body;
    if (!program.name) {
        return res.status(400).json({ error: "Missing program name" });
    }
    const createdProgram = await programRepository.create(user_id, program.name, program?.active ?? false);
    if (!createdProgram) {
        return res.status(404).json({ error: "There was an error creating the program" });
    }
    return res.status(200).json(createdProgram);
};

const updateName = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.programId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({ error: "Missing new name" });
    }
    const updatedProgram = await programRepository.updateName(user_id, body.name, id);
    if (!updatedProgram) {
        return res.status(404).json({ error: "There was an error updating the name" });
    }
    return res.status(200).json(updatedProgram);
};

const setActive = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.programId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const updatedProgram = await programRepository.setActive(user_id, id);
    if (!updatedProgram) {
        return res.status(404).json({ error: "There was an error setting the program as active" });
    }
    return res.status(200).json(updatedProgram);
};

const setInactive = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.programId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const updatedProgram = await programRepository.setInactive(user_id, id);
    if (!updatedProgram) {
        return res.status(404).json({ error: "There was an error setting the program as inactive" });
    }
    return res.status(200).json(updatedProgram);
};

const archive = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.programId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const updatedProgram = await programRepository.archive(user_id, id);
    if (!updatedProgram) {
        return res.status(404).json({ error: "There was an error archiving the program" });
    }
    return res.status(200).json(updatedProgram);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.programId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid program id" });
    }
    const deletedProgram = await programRepository.deleteOne(user_id, id);
    if (!deletedProgram) {
        return res.status(404).json({ error: "Program could not be deleted" });
    }
    return res.status(200).json(deletedProgram);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deletedPrograms = await programRepository.deleteAll(user_id);
    return res.status(200).json(deletedPrograms);
};

export { getAll, getOne, getCurrent, getArchived, getNonArchived, create, updateName, setActive, setInactive, archive, deleteOne, deleteAll };