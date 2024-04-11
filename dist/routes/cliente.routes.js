"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../controllers/clientes.controller");
const router = (0, express_1.Router)();
router.get('/', clientes_controller_1.getClientes);
router.get('/:idClientes', clientes_controller_1.getCliente);
router.post('/', clientes_controller_1.postCliente);
router.put('/:idClientes', clientes_controller_1.putCliente);
router.delete('/:idClientes', clientes_controller_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=cliente.routes.js.map