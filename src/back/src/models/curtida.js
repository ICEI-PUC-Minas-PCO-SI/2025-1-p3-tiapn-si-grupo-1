const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
//Teste
const Curtida = sequelize.define('curtida', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'usuario', key: 'id' }
  },
  flow_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'flow', key: 'id' }
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'curtida',
  timestamps: false
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
