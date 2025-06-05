require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.PGDATABASE,

  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.PGPORT || 5432,
    logging: false,
    dialectOptions: {
      ssl: false, // Set to true if you need SSL connection
    },
  }
);

module.exports = sequelize;
