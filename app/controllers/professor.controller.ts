import { ObjectId } from 'bson';
import { Response, response } from 'express';
import { signUpProfessor } from '../operations/Auth/index';
import {
    deleteProfessorById,
    findProfessorById,
    getAllProfessors,
} from '../operations/DB/professor.operation';

export const createProfessorCtrl = async (req, res: Response) => {
    try {
        const createdProfessor = await signUpProfessor(req.body);
        res.status(201).json({ professor: createdProfessor });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const findProfessorByIdCtrl = async (req, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundProfessor = await findProfessorById(id);
        if (!foundProfessor) {
            res.status(404).json({ message: 'Professor not found' });
            return;
        }
        res.status(200).json({ softSkill: foundProfessor });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const deleteProfessorByIdCtrl = async (req, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedSoftSkill = await deleteProfessorById(id);
        if (!deletedSoftSkill) {
            res.status(404).json({ message: 'Professor not found' });
            return;
        }
        res.status(200).json({ softskill: deletedSoftSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const getAllProfessorsCtrl = async (_req, res: Response) => {
    try {
        const responseProfessors = await getAllProfessors();
        if (!responseProfessors) {
            res.status(404).json({ message: 'Professor not found' });
            return;
        }

        const professors = responseProfessors.map( professor => (
            { 
              id: professor._id, 
              name: professor.name 
            }
        ));

        res.status(200).json({ professors });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
}