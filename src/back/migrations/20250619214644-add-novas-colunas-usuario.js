'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuario', 'cargo', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('usuario', 'empresa', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('usuario', 'descricao', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuario', 'cargo');
    await queryInterface.removeColumn('usuario', 'empresa');
    await queryInterface.removeColumn('usuario', 'descricao');
  }
};
