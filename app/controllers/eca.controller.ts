import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { signDocument, verifyDocumentSignature } from '../operations/Auth/crypto';
import {
    createExtracurricularActivity,
    deleteExtracurricularActivityById,
    findExtracurricularActivityById,
    updateExtracurricularActivityById,
    getAllExtracurricularActivitiesByStudent,
    getAllExtracurricularActivitiesByProfessor,
} from '../operations/DB/eca.operation';
import { findProfessorById, findProfessorNameById } from '../operations/DB/professor.operation';
import { findSoftSkillById } from '../operations/DB/softSkill.operation';
import { findStudentById, findStudentNameById } from '../operations/DB/student.operation';
import { setECA } from '../operations/Chain';
import { ExtracurricularActivity, Professor, Student } from '../types/';
import { getBalanceStudentEcas, getStudentEcas } from '../operations/Chain'
import { sharePortfolio } from '../operations/Auth/index';
import { PORTFOLIO_LINK } from '../../const'
import { uniq } from 'lodash'

interface EcaRequestInformation {
    title: string;
    idStudent: ObjectId;
    idProfessor: ObjectId;
    description: string;
    evidenceLink: string;
}

interface ApprovedRequestInformation {
    idECA: string;
    idSoftSkills: ObjectId[];
}

const requestECA = async (ecaInformation: EcaRequestInformation) => {
    const eca = {} as ExtracurricularActivity;
    const student: Student = await findStudentById(ecaInformation.idStudent);
    if (!student) {
        return null;
    }
    const professor: Professor = await findProfessorById(ecaInformation.idProfessor);

    if (!professor) {
        return null;
    }

    eca.title = ecaInformation.title;
    eca.description = ecaInformation.description;
    eca.evidenceLink = ecaInformation.evidenceLink;
    eca.idStudent = ecaInformation.idStudent;
    eca.idProfessor = ecaInformation.idProfessor;
    eca.studentKey = student.keys.publicKey;
    eca.professorKey = professor.keys.publicKey;

    const signature = signDocument(JSON.stringify({
        title: eca.title,
        description: eca.description,
        evidenceLink: eca.evidenceLink,
    }), student.keys.privateKey);
    eca.studentSignature = signature;
    const createdECA = await createExtracurricularActivity(eca);
    return createdECA;
};

const approveECA = async (approvedRequestInfo: ApprovedRequestInformation) => {
    const preEca: any = await findExtracurricularActivityById(new ObjectId(approvedRequestInfo.idECA));
    const eca: ExtracurricularActivity = preEca._doc;
    if (!eca) { return null; }

    const professor: Professor = await findProfessorById(eca.idProfessor);

    if (!professor) { return null; }
    if (
        approvedRequestInfo.idSoftSkills.length <= 0 ||
        approvedRequestInfo.idSoftSkills.length > 3) { return null; }

    const softSkills = await Promise.all(approvedRequestInfo.idSoftSkills.map(async idSoftSkill => {
        const softSkill = await findSoftSkillById(new ObjectId(idSoftSkill));
        return softSkill;
    }));
    eca.softSkills = softSkills.map(softSkills => softSkills.name);

    const professorSignature = signDocument(JSON.stringify({
        title: eca.title,
        description: eca.description,
        evidenceLink: eca.evidenceLink,
        softSkills: eca.softSkills,
    }), professor.keys.privateKey);

    if (!professorSignature) { return null; }

    eca.professorSignature = professorSignature;

    const approvedEca = updateExtracurricularActivityById(eca._id, eca);

    const isPartOfBlockchain = await setECA(eca);

    if (!isPartOfBlockchain) { return null; }

    return {
        id: eca._id,
        title: eca.title,
        status: 'Approved',
    };
};

const verifyValidateECA = async (ecaId: ObjectId) => {
    const preEca: any = await findExtracurricularActivityById(new ObjectId(ecaId));
    const eca: ExtracurricularActivity = preEca._doc;
    const student: Student = await findStudentById(eca.idStudent);
    const professor: Professor = await findProfessorById(eca.idProfessor);

    const studentData = {
        title: eca.title,
        description: eca.description,
        idStudent: eca.idStudent,
        idProfessor: eca.idProfessor,
        evidenceLink: eca.evidenceLink,
    };

    const professorData = {
        ...studentData,
        softSkills: eca.softSkills,
    };

    const verifiedStudent = verifyDocumentSignature(
        JSON.stringify(studentData),
        eca.studentSignature,
        student.keys.publicKey
    );
    const verifiedProfessor = verifyDocumentSignature(
        JSON.stringify(professorData),
        eca.professorSignature,
        professor.keys.publicKey
    );

    return [verifiedProfessor, verifiedStudent].every(verified => verified === true);
};

export const requestECACtrl = async (req, res: Response) => {
    try {
        const { title, idProfessor, description, evidenceLink } = req.body;
        const { id:idStudent } = req.authData;

        const requestedECA = await requestECA({ title, idStudent, idProfessor, description, evidenceLink });
        if (!requestedECA) {
            res.status(404).json({ message: 'Bad request' });
            return;
        }

        res.status(200).json({ eca: { id: requestedECA._id, title: requestedECA.title, status: 'Processing' } });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const approvedECACtrl = async (req, res: Response) => {
    try {
        const approvedEcaRequestInfo = req.body;
        const approvedECA = await approveECA(approvedEcaRequestInfo);
        if (!approvedECA) {
            res.status(404).json({ message: 'Bad request' });
            return;
        }
        res.status(200).json({ eca: approvedECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const verifyECACtrl = async (req, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const verifiedECA = await verifyValidateECA(id);
        res.status(200).json({ result: verifiedECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const findECAByIdCtrl = async (req, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const resFoundECA = await findExtracurricularActivityById(id);
        
        if (!resFoundECA) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        const { professorSignature, ...elements} = resFoundECA;
        const foundECA = resFoundECA._doc;
        foundECA.isApproved = foundECA.professorSignature ? true : false;
        
        const student = await findStudentNameById(resFoundECA.idStudent);
        const professor = await findProfessorNameById(resFoundECA.idProfessor);
        foundECA.student = student.name;
        foundECA.professor = professor.name;
        
        delete foundECA.professorSignature;
        delete foundECA.studentSignature;

        res.status(200).json({ eca: foundECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const deleteECAByIdCtrl = async (req, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedECA = await deleteExtracurricularActivityById(id);
        if (!deletedECA) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        res.status(200).json({ ECA: deletedECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const getAllEcasByStudent = async (req, res: Response) => {
    const { id }  = req.authData;
    try {
        const responseEcas = await getAllExtracurricularActivitiesByStudent(id);
        if (!responseEcas) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        
        const studentEcas = responseEcas.map(eca => ({ 
            id: eca._id, 
            title: eca.title, 
            status: eca.professorSignature ? 'Approved' : 'Processing'  
            }));
        
        res.status(200).json({ ecas: studentEcas });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
}

export const getAllProcessingEcasByProfessor = async (req, res: Response) => {
    const { id }  = req.authData;
    try {
        const responseEcas = await getAllExtracurricularActivitiesByProfessor(id);
        if (!responseEcas) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        
        const studentIds = uniq(responseEcas.map(eca => eca.idStudent));

        const students = await Promise.all(studentIds.map(id => findStudentNameById(id))); 

        const professorEcas = responseEcas
        .filter(eca => !eca.professorSignature)
        .map(eca => {
            return { 
                id: eca._id, 
                title: eca.title, 
                student: students.filter(student => student._id == eca.idStudent)[0].name,  
                }
        });
        
        res.status(200).json({ ecas: professorEcas });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
}

export const getEcasBalanceCtrl = async (req, res: Response) => {
    const { id } = req.authData;
    try {
        const balanceEcas = await getBalanceStudentEcas(id);
        if (!balanceEcas) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        
        res.status(200).json({ balance: balanceEcas });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
}

export const getBlockchainEcasCtrl = async (req, res: Response) => {
    const { id } = req.authData;
    try {
        const balanceEcas = await getStudentEcas(id);
        if (!balanceEcas) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        
        res.status(200).json({ balance: balanceEcas });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
}

export const sharePortfolioCtrl = async(req, res: Response) => {
    const { id } = req.authData;
    const token = await sharePortfolio(id);
    return res.json({
        link: `${PORTFOLIO_LINK}/${token}` 
    })
}