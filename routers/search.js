import { Router } from 'express';
const router = Router();

import searchController from '../controller/search/index.js';

router.get('/', searchController.normalSearch)



export default router;