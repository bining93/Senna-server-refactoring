import userController from '../controller/user/index.js';
import { Router } from 'express';
const router = Router();

import multer from 'multer';

const upload = multer({
    dest: 'uploads/'
})



//console.log('userController', userController);

//router 작업시마다 추가하기
//router.method('엔드포인트', 작업한 컨트롤러)
//router.post('/login', usersController.login);

// post /user/login 
router.post('/login', userController.login);
router.post('/upload', upload.single('avatar'), userController.upload);
router.post('/signup', userController.signup);
router.post('/checkid', userController.checkId);

router.patch('/favorite/:id', userController.favorite);

router.delete('/favorite/:id', userController.deleteFavorite);




export default router;


