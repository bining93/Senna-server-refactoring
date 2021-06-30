import postController from '../controller/post/index.js';
import { upload } from '../utils/multer.js'
import { Router } from 'express';
const router = Router();

//router 작업시마다 추가하기
// get /post/all - 모든 게시물 보내기
router.get('/all', postController.all)

// post /post/upload - 게시물 등록
router.post('/upload', upload.array('images', 5), postController.upload)

router.patch('/m/:id', upload.array('images', 5), postController.modify)

router.get('/d/:id', postController.deletePost)

export default router;