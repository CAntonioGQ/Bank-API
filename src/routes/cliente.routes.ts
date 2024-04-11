import { Router } from 'express'
import { deleteCliente, getCliente, getClientes, postCliente, putCliente } from '../controllers/clientes.controller'

const router = Router()


router.get('/', getClientes)
router.get('/:idClientes', getCliente)
router.post('/', postCliente)
router.put('/:idClientes', putCliente)
router.delete('/:idClientes', deleteCliente)

export default router