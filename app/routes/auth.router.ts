import { Router } from 'express';
import {
    loginCtrl,
    getMyInfoCtrl,
} from '../controllers/auth.controller';

import { checkUserToken } from '../controllers/middlewares/auth';

const authRoutes: Router = Router();

authRoutes.post('/login', loginCtrl);

authRoutes.get('/me', checkUserToken, getMyInfoCtrl)

export default authRoutes;
