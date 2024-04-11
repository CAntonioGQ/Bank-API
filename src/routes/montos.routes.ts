import { Router } from 'express'
import { deleteMonto, getMonto, getMontos, postMonto, putMonto } from '../controllers/montos.controller'

const router = Router()


router.get('/', getMontos)
router.get('/:idMontos', getMonto)
router.post('/', postMonto)
router.put('/:idMontos', putMonto)
router.delete('/:idMontos', deleteMonto)

export default router