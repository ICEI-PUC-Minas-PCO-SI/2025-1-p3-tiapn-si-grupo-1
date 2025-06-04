const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Curtida = sequelize.define('curtida', {}, {
  timestamps: false,
  tableName: 'curtida',
});

Curtida.associate = (models) => {
  Curtida.belongsTo(models.Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
  });

  Curtida.belongsTo(models.Flow, {
    foreignKey: 'flow_id',
    as: 'flow'
  });
};

module.exports = Curtida;
