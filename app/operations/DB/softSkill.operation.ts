import { ObjectId } from 'bson';
import SOFTSKILL from '../../models/SoftSkill';
import { SoftSkill } from '../../types';

export const createSoftSkill = async (softskill: SoftSkill): Promise<any> => {
    const createdSoftSkill = new SOFTSKILL(softskill);
    const resposeSoftSkill = await createdSoftSkill.save();
    return resposeSoftSkill;
};

export const getAllSoftSkill = async (): Promise<any> => SOFTSKILL.find();

export const findSoftSkillById = async (id: ObjectId): Promise<any> => SOFTSKILL.findById(id);

export const updateSoftSkillById = async (id: ObjectId, softskill: SoftSkill): Promise<any> =>
    SOFTSKILL.findByIdAndUpdate(id, softskill, { new: true });

export const deleteSoftSkillById = async (id: ObjectId): Promise<any> =>
    SOFTSKILL.findByIdAndDelete(id);
