import { ObjectId } from 'bson';
import ECA from '../../models/Eca';
import { ExtracurricularActivity } from '../../types';

export const createExtracurricularActivity = async (eca: ExtracurricularActivity): Promise<any> => {
    const createdECA = new ECA(eca);
    const resposeECA = await createdECA.save();
    return resposeECA;
};

export const findExtracurricularActivityById = async (id): Promise<any> => ECA.findById(id);

export const updateExtracurricularActivityById = async (id, eca: ExtracurricularActivity): Promise<any> =>
    ECA.findByIdAndUpdate(id, eca, { new: true });

export const deleteExtracurricularActivityById = async (id): Promise<any> =>
    ECA.findByIdAndDelete(id);

export const getAllExtracurricularActivitiesByStudent = async (idStudent: string): Promise<any> =>
    ECA.find({ idStudent });

export const getAllExtracurricularActivitiesByProfessor = async (idProfessor: string): Promise<any> =>
    ECA.find({ idProfessor });