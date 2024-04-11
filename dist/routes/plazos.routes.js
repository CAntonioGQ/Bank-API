"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plazos_controller_1 = require("../controllers/plazos.controller");
const router = (0, express_1.Router)();
router.get('/', plazos_controller_1.getPlazos);
router.get('/:idPlazos', plazos_controller_1.getPlazo);
router.post('/', plazos_controller_1.postPlazo);
router.put('/:idPlazos', plazos_controller_1.putPlazo);
router.delete('/:idPlazos', plazos_controller_1.deletePlazo);
exports.default = router;
//# sourceMappingURL=plazos.routes.js.map