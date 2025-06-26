const { DataTypes } = require('sequelize');
const sequelize = require('../../db'); // ou seu caminho correto

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha_hash: DataTypes.STRING,
  cargo: DataTypes.STRING,
  empresa: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;