import { DataTypes } from "sequelize";
import db from "../db/connection";

const Prestamo = db.define('Prestamo', {
  id_rel: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_clientes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_montos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_plazos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'prestamos',
  timestamps: false, // Si no tienes columnas de timestamps
});

export default Prestamo;
