import { Router } from 'express';
import {
    createStudentCtrl,
    deleteStudentByIdCtrl,
    findStudentByIdCtrl,
} from '../controllers/student.controller';

const apiStudent: Router = Router();

apiStudent.route('')
    .post(createStudentCtrl);

apiStudent.route('/:id')
    .get(findStudentByIdCtrl)
    .delete(deleteStudentByIdCtrl);

export default apiStudent;
