import userController from '../controller/user/index.js';
import { Router } from 'express';
const router = Router();

//console.log('userController', userController);

//router 작업시마다 추가하기
//router.method('엔드포인트', 작업한 컨트롤러)
//router.post('/login', usersController.login);

// post /user/login 
router.post('/login', userController.login);

router.post('/checkid', userController.checkId);

export default router;