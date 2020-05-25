import { Router } from 'express';
import {
    createSoftSkillCtrl,
    deleteSoftSkillByIdCtrl,
    findSoftSkillByIdCtrl,
    getAllSoftSkillCtrl,
} from '../controllers/softSkill.controller';

import { checkUserToken } from '../controllers/middlewares/auth';

const apiSoftSkill: Router = Router();

apiSoftSkill.route('')
    .get(checkUserToken, getAllSoftSkillCtrl)
    .post(createSoftSkillCtrl);

apiSoftSkill.route('/:id')
    .get(findSoftSkillByIdCtrl)
    .delete(deleteSoftSkillByIdCtrl);

export default apiSoftSkill;
