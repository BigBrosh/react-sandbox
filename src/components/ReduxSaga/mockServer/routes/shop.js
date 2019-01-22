import expess from 'express';
import { getItem, listItems } from '../controllers/shop';

const router = expess.Router();

router.get('/', listItems);
router.get('/:id', getItem);

export default router;