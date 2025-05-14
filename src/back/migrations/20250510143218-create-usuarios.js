'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
      },
      nome: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      senha_hash: { type: Sequelize.STRING, allowNull: false },
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('usuario');
  },
};
