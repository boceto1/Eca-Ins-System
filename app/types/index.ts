import { ObjectId } from 'bson';

interface CustomSchema {
    _id?: ObjectId;
    __v?: number;
}

export interface Student extends CustomSchema {
    name: string;
    password: string;
    keys: {
        privateKey: string;
        publicKey: string;
    };
}

export interface Professor extends CustomSchema {
    name: string;
    speciality: string;
    password: string;
    keys: {
        privateKey: string;
        publicKey: string;
    };
}

export interface SoftSkill extends CustomSchema {
    name: string;
}

export interface ExtracurricularActivity extends CustomSchema {
    title: string;
    idStudent: ObjectId;
    idProfessor: ObjectId;
    description: string;
    evidenceLink?: string;
    professorSignature: string;
    studentSignature: string;
    softSkills: string[];
}
