require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const sequelizeConfig = {
  dialect: "postgres",
  host: process.env.PGHOST,
  // ...
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
};
