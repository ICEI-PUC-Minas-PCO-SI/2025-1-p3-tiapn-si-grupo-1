const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Usuario = require('./usuario');
const Flow = require('./flow');

const Comentario = sequelize.define(
  'comentario',
  {
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
    },
    flow_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'comentario',
  }
);

  Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' });
  Comentario.belongsTo(Flow, { foreignKey: 'flow_id' });

module.exports = Comentario;
