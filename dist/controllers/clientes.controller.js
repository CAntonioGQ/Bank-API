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
exports.deleteCliente = exports.putCliente = exports.postCliente = exports.getCliente = exports.getClientes = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
//GET All Clients / Obtener todos los clientes
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield cliente_1.default.findAll();
    res.json({ clientes });
});
exports.getClientes = getClientes;
//GET Client by Primary Key (ID) / GET Cliente por ID
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClientes } = req.params;
    const cliente = yield cliente_1.default.findByPk(idClientes);
    if (cliente) {
        res.json({ cliente });
    }
    else {
        res.status(404).json({ msg: 'Cliente no encontrado, favor de colocar un ID correcto' });
    }
});
exports.getCliente = getCliente;
// POST New Client + Validation same nombreCliente
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Create new Client / Crear un nuevo cliente
        const cliente = yield cliente_1.default.create(body);
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'No se pudo crear un nuevo cliente' });
    }
});
exports.postCliente = postCliente;
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClientes } = req.params;
    const { body } = req;
    try {
        // Verify if exists a client with the same nombreCliente / Verificar si existe un cliente con el mismo nombreCliente
        const cliente = yield cliente_1.default.findByPk(idClientes);
        if (!cliente) {
            return res.status(404).json({ msg: 'No existe un cliente con el ID: ' + idClientes });
        }
        yield cliente.update(body);
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'No se pudo editar el cliente' });
    }
});
exports.putCliente = putCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClientes } = req.params;
    const cliente = yield cliente_1.default.findByPk(idClientes);
    if (!cliente) {
        return res.status(404).json({ msg: 'No existe un cliente con el ID: ' + idClientes });
    }
    yield cliente.destroy();
    res.json({ msg: 'Cliente eliminado correctamente' });
});
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=clientes.controller.js.map