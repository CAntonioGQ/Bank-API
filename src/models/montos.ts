import { DataTypes } from "sequelize";
import db from "../db/connection";

const Monto = db.define('Monto', {
  idMontos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  montos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'montos',
});

export default Monto;