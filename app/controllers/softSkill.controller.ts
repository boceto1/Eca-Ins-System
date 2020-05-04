import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { createSoftSkill, deleteSoftSkillById, findSoftSkillById } from '../operations/DB/softSkill.operation';
import { SoftSkill } from '../types/';

export const createSoftSkillCtrl = async (req: Request, res: Response) => {
    const softSkill = {} as SoftSkill;
    softSkill.name = req.body.name;

    try {
        const createdSoftSkill = await createSoftSkill(softSkill);
        res.status(201).json({ softSkill: createdSoftSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const findSoftSkillByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundSoftSkill = await findSoftSkillById(id);
        if (!foundSoftSkill) {
            res.status(404).json({ message: 'Soft Skill not found' });
            return;
        }
        res.status(200).json({ softSkill: foundSoftSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const deleteSoftSkillByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedSoftSkill = await deleteSoftSkillById(id);
        if (!deletedSoftSkill) {
            res.status(404).json({ message: 'Soft Skill not found' });
            return;
        }
        res.status(200).json({ softskill: deletedSoftSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};
