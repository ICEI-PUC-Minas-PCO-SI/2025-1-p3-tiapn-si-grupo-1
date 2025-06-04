const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const FlowSalvo = sequelize.define('flowsalvo', {}, {
  timestamps: false,
  tableName: 'flow_salvo',
});


FlowSalvo.associate = (models) => {
  FlowSalvo.belongsTo(models.Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
  });

  FlowSalvo.belongsTo(models.Flow, {
    foreignKey: 'flow_id',
    as: 'flow'
  });
};

module.exports = FlowSalvo;
