const { DataTypes } = require('sequelize');
const sequelize  = require('../../db');


const Usuario = sequelize.define('usuario', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  senha_hash: DataTypes.STRING,
  criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false, tableName: 'usuario', });

module.exports = Usuario;