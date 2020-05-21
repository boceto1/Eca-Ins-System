import { Router } from 'express';
import {
    approvedECACtrl,
    deleteECAByIdCtrl,
    findECAByIdCtrl,
    requestECACtrl,
    verifyECACtrl,
    getAllEcasByStudent,
} from '../controllers/eca.controller';

import { checkUserToken, checkTokenStudent } from '../controllers/middlewares/auth';

const apiECA: Router = Router();

apiECA.route('')
  .get(checkUserToken, getAllEcasByStudent);

apiECA.post('/request',checkTokenStudent,  requestECACtrl);
apiECA.post('/approve', approvedECACtrl);

apiECA.get('/verify/:id', verifyECACtrl);

apiECA.route('/:id')
    .get(checkUserToken, findECAByIdCtrl)
    .delete(deleteECAByIdCtrl);

export default apiECA;
