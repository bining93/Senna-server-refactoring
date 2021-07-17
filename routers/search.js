import searchController from '../controller/search/index.js';
import { Router } from 'express';
const router = Router();

router.get('/', searchController.normalSearch);

router.get('/hot', searchController.hotKeyword);

export default router;