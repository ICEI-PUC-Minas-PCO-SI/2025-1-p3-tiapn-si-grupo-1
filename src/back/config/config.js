require("dotenv").config();
module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
      ssl: {
        require: false, // Desativa o uso de SSL
        rejectUnauthorized: false,
      },
    },
  },
};
