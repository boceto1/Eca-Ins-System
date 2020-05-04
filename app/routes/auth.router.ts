import { Router } from 'express';
import {
    loginCtrl
} from '../controllers/auth.controller';

const authRoutes: Router = Router();

authRoutes.post('/login', loginCtrl);

export default authRoutes;
