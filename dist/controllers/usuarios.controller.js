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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
//GET All Users / Obtener todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
//GET Users by Primary Key (ID) / GET Usuario por ID
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClientes } = req.params;
    const usuario = yield usuario_1.default.findByPk(idClientes);
    if (usuario) {
        res.json({ usuario });
    }
    else {
        res.status(404).json({
            msg: 'Usuario no Encontrado, favor de colocar un ID correcto'
        });
    }
});
exports.getUsuario = getUsuario;
// POST New User + Validation same nombreCliente  
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Create new User / Crear un nuevo usuario
        const usuario = yield usuario_1.default.create(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'No se pudo crear un nuevo usuario' });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClientes } = req.params;
    const { body } = req;
    try {
        // Verify if exists a user with the same nombreCliente / Verificar si existe un usuario con el mismo nombreCliente
        const usuario = yield usuario_1.default.findByPk(idClientes);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el ID: ' + idClientes
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No se pudo editar un nuevo usuario'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClientes } = req.params;
    const usuario = yield usuario_1.default.findByPk(idClientes);
    if (!usuario) {
        return res.status(404).json({ msg: 'No existe un usuario con el ID: ' + idClientes });
    }
    yield usuario.destroy();
    res.json({ msg: 'Usuario eliminado correctamente' });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map