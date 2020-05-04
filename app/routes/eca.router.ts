import { Router } from 'express';
import {
    approvedECACtrl,
    deleteECAByIdCtrl,
    findECAByIdCtrl,
    requestECACtrl,
    verifyECACtrl,
} from '../controllers/eca.controller';

const apiECA: Router = Router();

apiECA.post('/request', requestECACtrl);
apiECA.post('/approve', approvedECACtrl);

apiECA.get('/verify/:id', verifyECACtrl);

apiECA.route('/:id')
    .get(findECAByIdCtrl)
    .delete(deleteECAByIdCtrl);

export default apiECA;
