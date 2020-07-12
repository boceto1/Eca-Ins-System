import { Router } from 'express';
import {
    approvedECACtrl,
    deleteECAByIdCtrl,
    findECAByIdCtrl,
    requestECACtrl,
    verifyECACtrl,
    getAllEcasByStudent,
    getEcasBalanceCtrl,
    getBlockchainEcasCtrl,
    sharePortfolioCtrl,
} from '../controllers/eca.controller';

import { 
  checkUserToken, 
  checkTokenStudent, 
  checkTokenProfessor, 
  checkPortfolioToken 
} from '../controllers/middlewares/auth';

const apiECA: Router = Router();

apiECA.route('')
  .get(checkUserToken, getAllEcasByStudent);

apiECA.post('/request',checkTokenStudent,  requestECACtrl);
apiECA.post('/approve', checkTokenProfessor, approvedECACtrl);
apiECA.post('/share', checkTokenStudent, sharePortfolioCtrl)

apiECA.get('/verify/:id', verifyECACtrl);
apiECA.get('/balance', checkTokenStudent, getEcasBalanceCtrl);
apiECA.get('/blockchain', checkTokenStudent, getBlockchainEcasCtrl);

apiECA.post('/share', checkTokenStudent, sharePortfolioCtrl);
apiECA.get('/portfolio/balance/:token', checkPortfolioToken, getEcasBalanceCtrl);
apiECA.get('/portfolio/blockchain/:token', checkPortfolioToken, getBlockchainEcasCtrl);

apiECA.route('/:id')
    .get(checkUserToken, findECAByIdCtrl)
    .delete(deleteECAByIdCtrl);

export default apiECA;
