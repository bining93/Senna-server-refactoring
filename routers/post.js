import postController from '../controller/post/index.js';
import { upload } from '../utils/multer.js'
import { Router } from 'express';
const router = Router();


router.get('/all', postController.all)

router.get('/:id', postController.getPosting)

router.post('/upload', upload.array('images', 5), postController.upload)

router.patch('/:id', upload.array('images', 5), postController.modify)

router.delete('/:id', postController.deletePost)

export default router;