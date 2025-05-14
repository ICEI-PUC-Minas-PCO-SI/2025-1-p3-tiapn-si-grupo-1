const { DataTypes } = require('sequelize');
const  sequelize  = require('../../db');

const Curtida = sequelize.define('curtida', {}, {
  timestamps: false, tableName: 'curtida',
});

module.exports = Curtida;
