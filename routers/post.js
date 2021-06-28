import postController from '../controller/post/index.js';
import { Router } from 'express';
const router = Router();



//router 작업시마다 추가하기

// get /post/all - 모든 게시물 보내기
router.get('/all', postController.all)

// post /post/upload - 게시물 등록
router.post('/upload', postController.upload)

router.patch('/m/:id', postController.modify)





export default router;