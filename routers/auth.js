import { Router } from 'express';
import dotenv from 'dotenv';
import social from '../controller/social/index.js';

const router = Router();
dotenv.config();

router.get('/callback/kakao', social.kakaoLogin);

router.delete('/:id', social.kakaoWithdrawal);


export default router;

