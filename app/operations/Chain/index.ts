import axios from 'axios';
import { findStudentById } from '../DB/student.operation';
import { ExtracurricularActivity, Student } from '../../types';
import { CHAIN_URL } from '../../../const';

interface EcaBalance {
    ecas: number;
    softSkills: {
        [key: string]: number;
    }
}

export const setECA = async (eca: ExtracurricularActivity): Promise<boolean> => {

    const transactionPool = await axios.post(`${CHAIN_URL}/transactions`, {
        title: eca.title,             
        description: eca.description,
        evidenceLink: eca.evidenceLink,
        softSkills: eca.softSkills,
        studentKey: eca.studentKey,
        professorKey: eca.professorKey,
        professorSignature: eca.professorSignature,
        studentSignature: eca.studentSignature,
    });

    return true;
}

export const getBalanceStudentEcas = async (idStudent: string) : Promise<EcaBalance> => {
    const student:Student = await findStudentById(idStudent);

    const response = await axios.get(`${CHAIN_URL}/transactions/balance`, {
        data: { key: student.keys.publicKey }
    });

    const balance = response.data;
    return balance;
}

export const getStudentEcas = async (idStudent: string): Promise<any> => {
    const student:Student = await findStudentById(idStudent);
    const response = await axios.get(`${CHAIN_URL}/transactions`, {
        data: { key: student.keys.publicKey }
    });

    const balance = response.data;
    return balance;
}