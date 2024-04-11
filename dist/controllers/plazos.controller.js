"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlazo = exports.putPlazo = exports.postPlazo = exports.getPlazo = exports.getPlazos = void 0;
const plazos_1 = __importDefault(require("../models/plazos"));
//GET All Plazos / Obtener todos los plazos
const getPlazos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plazos = yield plazos_1.default.findAll();
    res.json({ plazos: plazos });
});
exports.getPlazos = getPlazos;
//GET Plazo by Primary Key (ID) / GET Plazo por ID
const getPlazo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPlazos } = req.params;
    const plazo = yield plazos_1.default.findByPk(idPlazos);
    if (plazo) {
        res.json({ plazo: plazo });
    }
    else {
        res.status(404).json({ msg: 'Plazo no encontrado, favor de colocar un ID correcto' });
    }
});
exports.getPlazo = getPlazo;
// POST New Plazo + Validation same nombreCliente
const postPlazo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Create new Plazo / Crear un nuevo plazo
        const plazo = yield plazos_1.default.create(body);
        res.json(plazo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'No se pudo crear un nuevo plazo' });
    }
});
exports.postPlazo = postPlazo;
const putPlazo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPlazos } = req.params;
    const { body } = req;
    try {
        // Verify if exists a plazo with the same nombreCliente / Verificar si existe un plazo con el mismo nombreCliente
        const plazo = yield plazos_1.default.findByPk(idPlazos);
        if (!plazo) {
            return res.status(404).json({ msg: 'No existe un plazo con el ID: ' + idPlazos });
        }
        yield plazo.update(body);
        res.json(plazo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'No se pudo editar el plazo' });
    }
});
exports.putPlazo = putPlazo;
const deletePlazo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPlazos } = req.params;
    const plazo = yield plazos_1.default.findByPk(idPlazos);
    if (!plazo) {
        return res.status(404).json({ msg: 'No existe un plazo con el ID: ' + idPlazos });
    }
    yield plazo.destroy();
    res.json({ msg: 'Plazo eliminado correctamente' });
});
exports.deletePlazo = deletePlazo;
//# sourceMappingURL=plazos.controller.js.map