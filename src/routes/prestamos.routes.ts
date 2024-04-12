import { Router } from 'express';
import { deletePrestamo, getPrestamo, getPrestamos, postPrestamo, putPrestamo } from '../controllers/prestamos.controller';

const router = Router();

router.get('/', getPrestamos);
router.get('/:id_rel', getPrestamo);
router.post('/', postPrestamo);
router.put('/:id_rel', putPrestamo);
router.delete('/:id_rel', deletePrestamo);

export default router;
