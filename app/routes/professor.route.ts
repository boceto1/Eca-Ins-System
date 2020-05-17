import { Router } from 'express';
import {
    createProfessorCtrl,
    deleteProfessorByIdCtrl,
    findProfessorByIdCtrl,
    getAllProfessorsCtrl,
} from '../controllers/professor.controller';

import { checkTokenStudent } from '../controllers/middlewares/auth';

const apiProfessor: Router = Router();

apiProfessor.route('')
    .post(createProfessorCtrl)
    .get(checkTokenStudent, getAllProfessorsCtrl);

apiProfessor.route('/:id')
    .get(findProfessorByIdCtrl)
    .delete(deleteProfessorByIdCtrl);

export default apiProfessor;
