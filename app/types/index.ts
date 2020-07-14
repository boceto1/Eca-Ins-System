import { ObjectId } from 'bson';

interface CustomSchema {
    _id?: ObjectId;
    __v?: number;
}

export interface Student extends CustomSchema {
    nickname: string,
    name: string;
    password: string;
    keys: {
        privateKey: string;
        publicKey: string;
    };
}

export interface Professor extends CustomSchema {
    nickname: string,
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
    studentKey: string;
    professorKey: string
    description: string;
    evidenceLink?: string;
    professorSignature: string;
    studentSignature: string;
    softSkills: string[];
}
