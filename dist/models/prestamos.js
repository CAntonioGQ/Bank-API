"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Prestamo = connection_1.default.define('Prestamo', {
    id_rel: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_clientes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_montos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_plazos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'prestamos',
    timestamps: false, // Si no tienes columnas de timestamps
});
exports.default = Prestamo;
//# sourceMappingURL=prestamos.js.map