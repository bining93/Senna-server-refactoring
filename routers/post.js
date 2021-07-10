import postController from '../controller/post/index.js';
import { upload } from '../utils/multer.js'
import { Router } from 'express';
const router = Router();


router.get('/all', postController.all)

router.get('/:id', postController.getPosting)

router.post('/upload', upload.array('images', 5), postController.upload)

//patch /m/:id -> patch /:id 수정 
router.patch('/:id', upload.array('images', 5), postController.modify)
//delete /d/:id -> delete /:id 수정 
router.delete('/:id', postController.deletePost)

export default router;