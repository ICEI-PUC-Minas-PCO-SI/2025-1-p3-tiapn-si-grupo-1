const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const FlowSalvo = sequelize.define(
  "flowsalvo",
  {
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "usuario", key: "id" },
    },
    flow_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "flow", key: "id" },
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "flow_salvo",
    timestamps: false,
  }
);

module.exports = FlowSalvo;
