import { Router } from 'express'
import { deletePlazo, getPlazo, getPlazos, postPlazo, putPlazo } from '../controllers/plazos.controller'

const router = Router()


router.get('/', getPlazos)
router.get('/:idPlazos', getPlazo)
router.post('/', postPlazo)
router.put('/:idPlazos', putPlazo)
router.delete('/:idPlazos', deletePlazo)

export default router