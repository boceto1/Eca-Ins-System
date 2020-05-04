import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { signDocument, verifyDocumentSignature } from '../operations/Auth/crypto';
import {
    createExtracurricularActivity,
    deleteExtracurricularActivityById,
    findExtracurricularActivityById,
    updateExtracurricularActivityById
} from '../operations/DB/eca.operation';
import { findProfessorById } from '../operations/DB/professor.operation';
import { findSoftSkillById } from '../operations/DB/softSkill.operation';
import { findStudentById } from '../operations/DB/student.operation';
import { ExtracurricularActivity, Professor, Student } from '../types/';

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
    const student = await findStudentById(ecaInformation.idStudent);
    if (!student) {
        return null;
    }
    const professor = await findProfessorById(ecaInformation.idProfessor);

    if (!professor) {
        return null;
    }

    eca.title = ecaInformation.title;
    eca.description = ecaInformation.description;
    eca.evidenceLink = ecaInformation.evidenceLink;
    eca.idStudent = ecaInformation.idStudent;
    eca.idProfessor = ecaInformation.idProfessor;

    const signature = signDocument(JSON.stringify({
        title: eca.title,
        description: eca.description,
        idStudent: eca.idStudent,
        idProfessor: eca.idProfessor,
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
        idStudent: eca.idStudent,
        idProfessor: eca.idProfessor,
        evidenceLink: eca.evidenceLink,
        softSkills: eca.softSkills,
    }), professor.keys.privateKey);

    if (!professorSignature) { return null; }

    eca.professorSignature = professorSignature;

    const approvedEca = updateExtracurricularActivityById(eca._id, eca);

    return approvedEca;
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

export const requestECACtrl = async (req: Request, res: Response) => {
    try {
        const ecaRequestInformation = req.body;
        const requestedECA = await requestECA(ecaRequestInformation);
        if (!requestedECA) {
            res.status(404).json({ message: 'Bad request' });
            return;
        }
        res.status(200).json({ requestedECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const approvedECACtrl = async (req: Request, res: Response) => {
    try {
        const approvedEcaRequestInfo = req.body;
        const approvedECA = await approveECA(approvedEcaRequestInfo);
        if (!approvedECA) {
            res.status(404).json({ message: 'Bad request' });
            return;
        }
        res.status(200).json({ approvedECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const verifyECACtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const verifiedECA = await verifyValidateECA(id);
        res.status(200).json({ result: verifiedECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const findECAByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundECA = await findExtracurricularActivityById(id);
        if (!foundECA) {
            res.status(404).json({ message: 'ECA not found' });
            return;
        }
        res.status(200).json({ ECA: foundECA });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const deleteECAByIdCtrl = async (req: Request, res: Response) => {
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
