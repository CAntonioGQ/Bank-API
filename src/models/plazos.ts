import { DataTypes } from "sequelize";
import db from "../db/connection";

const Plazo = db.define('Plazo', {
  idPlazos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plazos: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'plazos',
});

export default Plazo;