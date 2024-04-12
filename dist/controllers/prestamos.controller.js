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
exports.deletePrestamo = exports.putPrestamo = exports.postPrestamo = exports.getPrestamo = exports.getPrestamos = void 0;
const prestamos_1 = __importDefault(require("../models/prestamos"));
// Obtener todos los préstamos
const getPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prestamos = yield prestamos_1.default.findAll();
        res.json({ prestamos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los préstamos' });
    }
});
exports.getPrestamos = getPrestamos;
// Obtener préstamo por ID
const getPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rel } = req.params;
    try {
        const prestamo = yield prestamos_1.default.findByPk(id_rel);
        if (prestamo) {
            res.json({ prestamo });
        }
        else {
            res.status(404).json({ msg: 'Préstamo no encontrado, favor de colocar un ID correcto' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el préstamo' });
    }
});
exports.getPrestamo = getPrestamo;
// Crear un nuevo préstamo
const postPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const prestamo = yield prestamos_1.default.create(body);
        res.json(prestamo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo crear un nuevo préstamo' });
    }
});
exports.postPrestamo = postPrestamo;
// Actualizar un préstamo existente
const putPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rel } = req.params;
    const { body } = req;
    try {
        const prestamo = yield prestamos_1.default.findByPk(id_rel);
        if (!prestamo) {
            return res.status(404).json({ msg: 'No existe un préstamo con el ID: ' + id_rel });
        }
        yield prestamo.update(body);
        res.json(prestamo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo actualizar el préstamo' });
    }
});
exports.putPrestamo = putPrestamo;
// Eliminar un préstamo
const deletePrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rel } = req.params;
    try {
        const prestamo = yield prestamos_1.default.findByPk(id_rel);
        if (!prestamo) {
            return res.status(404).json({ msg: 'No existe un préstamo con el ID: ' + id_rel });
        }
        yield prestamo.destroy();
        res.json({ msg: 'Préstamo eliminado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo eliminar el préstamo' });
    }
});
exports.deletePrestamo = deletePrestamo;
//# sourceMappingURL=prestamos.controller.js.map