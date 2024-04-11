"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const montos_controller_1 = require("../controllers/montos.controller");
const router = (0, express_1.Router)();
router.get('/', montos_controller_1.getMontos);
router.get('/:idMontos', montos_controller_1.getMonto);
router.post('/', montos_controller_1.postMonto);
router.put('/:idMontos', montos_controller_1.putMonto);
router.delete('/:idMontos', montos_controller_1.deleteMonto);
exports.default = router;
//# sourceMappingURL=montos.routes.js.map