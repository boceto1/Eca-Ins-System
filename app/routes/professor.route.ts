import { Router } from 'express';
import {
    createProfessorCtrl,
    deleteProfessorByIdCtrl,
    findProfessorByIdCtrl,
    getAllProfessorsCtrl,
} from '../controllers/professor.controller';

import { getAllProcessingEcasByProfessor } from '../controllers/eca.controller'
import { checkTokenStudent, checkTokenProfessor } from '../controllers/middlewares/auth';

const apiProfessor: Router = Router();

apiProfessor.route('')
    .post(createProfessorCtrl)
    .get(checkTokenProfessor, getAllProfessorsCtrl);

apiProfessor.get('/ecas', checkTokenProfessor, getAllProcessingEcasByProfessor)

apiProfessor.route('/:id')
    .get(findProfessorByIdCtrl)
    .delete(deleteProfessorByIdCtrl);

export default apiProfessor;
