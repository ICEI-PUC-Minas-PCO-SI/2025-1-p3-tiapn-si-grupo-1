const { DataTypes } = require('sequelize');
const  sequelize  = require('../../db');

const ComentarioPostagem = sequelize.define('ComentarioPostagem', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  postagem_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  mensagem: {
    type: DataTypes.TEXT,
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'comentario_postagem',
  timestamps: false
});

module.exports = ComentarioPostagem;
