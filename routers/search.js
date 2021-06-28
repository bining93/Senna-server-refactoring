import searchController from '../controller/search/index.js';
import { Router } from 'express';
const router = Router();



router.get('/', searchController.normalSearch)



export default router;