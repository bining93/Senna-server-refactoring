import userController from '../controller/user/index.js';
import { upload } from '../utils/multer.js'
import { Router } from 'express';

const router = Router();

// post /user/login 
router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.post('/checkid', userController.checkId);

router.post('/signup', upload.single('avatar'), userController.signup);

router.get('/info', userController.info);

router.get('/request_token', userController.refreshtoken)

//patch /d/:id -> delete /:id 수정 
router.delete('/:id', userController.withdrawal);

router.patch('/profile/:id', upload.single('profileImg'), userController.updateProfile);

// favorite/:id -> /:id/favorite
router.patch('/:id/favorite', userController.favorite);
// favorite/:id -> /:id/favorite
router.delete('/:id/favorite', userController.deleteFavorite);




export default router;


