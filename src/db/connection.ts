import { Sequelize } from "sequelize";

const db = new Sequelize('bankapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
})

export default db