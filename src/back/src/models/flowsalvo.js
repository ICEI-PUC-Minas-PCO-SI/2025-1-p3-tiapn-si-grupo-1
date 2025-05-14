const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const FlowSalvo = sequelize.define('flowsalvo', {}, {
  timestamps: false,
  tableName: 'flow_salvo',
});

module.exports = FlowSalvo;
