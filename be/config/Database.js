import { Sequelize } from "sequelize";

const db = new Sequelize('sosblog2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db