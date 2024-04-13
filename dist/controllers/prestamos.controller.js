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
exports.deletePrestamo = exports.postPrestamo = exports.getPrestamo = exports.getPrestamos = void 0;
const prestamos_1 = __importDefault(require("../models/prestamos"));
const connection_1 = __importDefault(require("../db/connection"));
const getPrestamos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prestamos = yield connection_1.default.query(`
        SELECT DISTINCT 
          pr.id_rel, 
          c.nombreCliente, 
          m.montos, 
          p.plazos,
          pr.createdAt
        FROM prestamos pr
        JOIN clientes c ON pr.id_clientes = c.idClientes
        JOIN montos m ON pr.id_montos = m.idMontos
        JOIN plazos p ON pr.id_plazos = p.idPlazos
      `);
        const prestamosData = prestamos[0];
        res.json({ prestamos: prestamosData });
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
        const prestamo = yield connection_1.default.query(`
      SELECT DISTINCT c.nombreCliente, m.montos, p.plazos
      FROM prestamos pr
      JOIN clientes c ON pr.id_clientes = c.idClientes
      JOIN montos m ON pr.id_montos = m.idMontos
      JOIN plazos p ON pr.id_plazos = p.idPlazos
      WHERE pr.id_rel = :id_rel
    `, { replacements: { id_rel } });
        // Extraer el resultado de la consulta del primer elemento del array
        const prestamoData = prestamo[0];
        if (prestamoData.length > 0) {
            res.json({ prestamo: prestamoData[0] });
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
const postPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreCliente, montos, plazos } = req.body;
    try {
        // Buscar el ID del cliente por su nombre
        const cliente = yield connection_1.default.query(`SELECT idClientes FROM clientes WHERE nombreCliente = :nombreCliente`, {
            replacements: { nombreCliente },
        });
        const id_clientes = cliente[0][0].idClientes;
        // Buscar el ID del monto
        const monto = yield connection_1.default.query(`SELECT idMontos FROM montos WHERE montos = :montos`, {
            replacements: { montos },
        });
        const id_montos = monto[0][0].idMontos;
        // Buscar el ID del plazo
        const plazo = yield connection_1.default.query(`SELECT idPlazos FROM plazos WHERE plazos = :plazos`, {
            replacements: { plazos },
        });
        const id_plazos = plazo[0][0].idPlazos;
        // Crear el préstamo con los IDs encontrados y el timestamp actual
        const prestamo = yield prestamos_1.default.create({
            id_clientes,
            id_montos,
            id_plazos,
            createdAt: connection_1.default.literal('NOW()'),
        });
        // Enviar la respuesta con el préstamo creado
        res.json(prestamo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo crear un nuevo préstamo' });
    }
});
exports.postPrestamo = postPrestamo;
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