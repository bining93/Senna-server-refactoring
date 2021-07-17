import userController from '../controller/user/index.js';
import { upload } from '../utils/multer.js'
import { Router } from 'express';
import { checkAccessToken, checkRefreshToken } from '../utils/tokenFunc.js';
const router = Router();

router.post('/login', userController.login);

router.get('/logout', checkAccessToken, userController.logout);

router.post('/checkid', userController.checkId);

router.post('/signup', upload.single('avatar'), userController.signup);

router.get('/info', checkAccessToken, userController.info);

router.get('/request-token', checkRefreshToken, userController.refreshtoken)
 
router.delete('/:id', userController.withdrawal);

router.patch('/profile/:id', upload.single('profileImg'), userController.updateProfile);

router.patch('/:id/favorite', userController.favorite);

router.delete('/:id/favorite', userController.deleteFavorite);

export default router;


