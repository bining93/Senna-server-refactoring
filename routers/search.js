import searchController from '../controller/search/index.js';
import { Router } from 'express';
const router = Router();



router.get('/', searchController.normalSearch);
//router.get('/', searchController.test);
router.get('/hot', searchController.hotSearch);

router.get('/suggest', searchController.userKeyword);

export default router;