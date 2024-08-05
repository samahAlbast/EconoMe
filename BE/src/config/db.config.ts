import { Sequelize } from "sequelize";

const db = new Sequelize('econome', '', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
