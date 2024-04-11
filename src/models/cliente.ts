import { DataTypes } from "sequelize";
import db from "../db/connection";

const Cliente = db.define('Cliente', {
  idClientes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreCliente: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Clientes',
});

export default Cliente;