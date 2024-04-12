"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamos_controller_1 = require("../controllers/prestamos.controller");
const router = (0, express_1.Router)();
router.get('/', prestamos_controller_1.getPrestamos);
router.get('/:id_rel', prestamos_controller_1.getPrestamo);
router.post('/', prestamos_controller_1.postPrestamo);
// router.put('/:id_rel', putPrestamo);
router.delete('/:id_rel', prestamos_controller_1.deletePrestamo);
exports.default = router;
//# sourceMappingURL=prestamos.routes.js.map