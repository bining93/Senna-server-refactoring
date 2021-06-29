import userController from '../controller/user/index.js';
import { Router } from 'express';
import upload from '../utils/multer.js'
const router = Router();



//console.log('userController', userController);

//router 작업시마다 추가하기
//router.method('엔드포인트', 작업한 컨트롤러)
//router.post('/login', usersController.login);

// post /user/login 
router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/info', userController.info);

router.patch('/profile/:id', upload.single('profileImg'), userController.updateProfile);

router.patch('/d/:id', userController.withdrawal);

router.post('/upload', upload.single('avatar'), userController.upload);

router.post('/signup', upload.single('avatar'), userController.signup);

router.post('/checkid', userController.checkId);

router.patch('/favorite/:id', userController.favorite);

router.delete('/favorite/:id', userController.deleteFavorite);




export default router;


