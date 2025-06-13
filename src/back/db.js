require("dotenv").config();
const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.PGPORT || 5432,
    logging: false,
    ...(isProduction && {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
  }
);

module.exports = sequelize;

module.exports = sequelize;

console.log("Variáveis de ambiente carregadas:", {
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
});
