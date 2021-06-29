import userController from '../controller/user/index.js';
import { upload } from '../utils/multer.js'
import { Router } from 'express';

const router = Router();

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


