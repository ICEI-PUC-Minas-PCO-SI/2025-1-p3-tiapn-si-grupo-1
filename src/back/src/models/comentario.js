const { DataTypes } = require('sequelize');
const  sequelize  = require('../../db');

const Comentario = sequelize.define('comentario', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  mensagem: {
    type: DataTypes.TEXT,
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false, tableName: 'comentario',
});

module.exports = Comentario;
