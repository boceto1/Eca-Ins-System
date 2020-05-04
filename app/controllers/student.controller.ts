import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { signUpStudent } from '../operations/Auth/index';
import {
    deleteStudentById,
    findStudentById,
} from '../operations/DB/student.operation';

export const createStudentCtrl = async (req: Request, res: Response) => {
    try {
        const result = await signUpStudent({ name: req.body.name, password: req.body.password });
        res.status(201).json({
            student: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const findStudentByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundStudent = await findStudentById(id);
        if (!foundStudent) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json({ foundStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const deleteStudentByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedStudent = await deleteStudentById(id);
        if (!deletedStudent) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json({ deletedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};
