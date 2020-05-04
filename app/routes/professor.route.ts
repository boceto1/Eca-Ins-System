import { Router } from 'express';
import {
    createProfessorCtrl,
    deleteProfessorByIdCtrl,
    findProfessorByIdCtrl,
} from '../controllers/professor.controller';

const apiProfessor: Router = Router();

apiProfessor.route('')
    .post(createProfessorCtrl);

apiProfessor.route('/:id')
    .get(findProfessorByIdCtrl)
    .delete(deleteProfessorByIdCtrl);

export default apiProfessor;
