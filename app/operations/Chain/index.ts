import axios from 'axios';
import { ExtracurricularActivity } from '../../types';
import { CHAIN_URL } from '../../../const';

export const setECA = async (eca: ExtracurricularActivity): Promise<boolean> => {


    const transactionPool = await axios.post(`http://127.0.0.1:5000/api/transactions`, {
        title: eca.title,
        description: eca.description,
        evidenceLink: eca.evidenceLink,
        softSkills: eca.softSkills,
        studentKey: eca.studentKey,
        professorKey: eca.professorKey,
        professorSignature: eca.professorSignature,
        studentSignature: eca.studentSignature,
    });

    console.log('transactionPool:', transactionPool);

    return true;
}