const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const PostagemComunidade = sequelize.define('PostagemComunidade', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  conteudo: {
    type: DataTypes.TEXT,
  },
  criado_por: {
    type: DataTypes.UUID,
    allowNull: false
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'postagem_comunidade',
  timestamps: false
});

module.exports = PostagemComunidade;
