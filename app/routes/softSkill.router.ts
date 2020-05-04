import { Router } from 'express';
import {
    createSoftSkillCtrl,
    deleteSoftSkillByIdCtrl,
    findSoftSkillByIdCtrl
} from '../controllers/softSkill.controller';

const apiSoftSkill: Router = Router();

apiSoftSkill.route('')
    .post(createSoftSkillCtrl);

apiSoftSkill.route('/:id')
    .get(findSoftSkillByIdCtrl)
    .delete(deleteSoftSkillByIdCtrl);

export default apiSoftSkill;
