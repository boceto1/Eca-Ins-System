import { ObjectId } from 'bson';
import PROFESSOR from '../../models/Professor';
import { Professor } from '../../types';

export const createProfessor = async (professor: Professor): Promise<any> => {
    console.log('Professor', professor);
    const createdProfesor = new PROFESSOR(professor);
    const resposeProfessor = await createdProfesor.save();
    return resposeProfessor;
};

export const findProfessorById = async (id: ObjectId): Promise<any> => PROFESSOR.findById(id);

export const findProfessorByName = async (name: string): Promise<any> => PROFESSOR.findOne({ name });

export const updateProfessorById = async (id: ObjectId, professor: Professor): Promise<any> =>
    PROFESSOR.findByIdAndUpdate(id, professor, { new: true });

export const deleteProfessorById = async (id: ObjectId): Promise<any> =>
    PROFESSOR.findByIdAndDelete(id);
