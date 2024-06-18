import { Sequelize } from "sequelize";

const db = new Sequelize('econome', 'root', 'samah', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;