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
exports.deleteMonto = exports.putMonto = exports.postMonto = exports.getMonto = exports.getMontos = void 0;
const montos_1 = __importDefault(require("../models/montos"));
//GET All Users / Obtener todos los usuarios
const getMontos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const montos = yield montos_1.default.findAll();
    res.json({ montos: montos });
});
exports.getMontos = getMontos;
//GET Users by Primary Key (ID) / GET Usuario por ID
const getMonto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idMontos: idMontos } = req.params;
    const monto = yield montos_1.default.findByPk(idMontos);
    if (monto) {
        res.json({ monto: monto });
    }
    else {
        res.status(404).json({
            msg: 'Usuario no Encontrado, favor de colocar un ID correcto'
        });
    }
});
exports.getMonto = getMonto;
// POST New User + Validation same nombreCliente  
const postMonto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Create new User / Crear un nuevo usuario
        const monto = yield montos_1.default.create(body);
        res.json(monto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'No se pudo crear un nuevo usuario' });
    }
});
exports.postMonto = postMonto;
const putMonto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idMontos: idMontos } = req.params;
    const { body } = req;
    try {
        // Verify if exists a user with the same nombreCliente / Verificar si existe un usuario con el mismo nombreCliente
        const monto = yield montos_1.default.findByPk(idMontos);
        if (!monto) {
            return res.status(404).json({
                msg: 'No existe un usuario con el ID: ' + idMontos
            });
        }
        yield monto.update(body);
        res.json(monto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No se pudo editar un nuevo usuario'
        });
    }
});
exports.putMonto = putMonto;
const deleteMonto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idMontos } = req.params;
    const monto = yield montos_1.default.findByPk(idMontos);
    if (!monto) {
        return res.status(404).json({ msg: 'No existe un usuario con el ID: ' + idMontos });
    }
    yield monto.destroy();
    res.json({ msg: 'Usuario eliminado correctamente' });
});
exports.deleteMonto = deleteMonto;
//# sourceMappingURL=montos.controller.js.map