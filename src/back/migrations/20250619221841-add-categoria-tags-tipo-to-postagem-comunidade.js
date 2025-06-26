'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('postagem_comunidade', 'categoria', {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // });

    await queryInterface.addColumn('postagem_comunidade', 'tipo', {
    type: Sequelize.ENUM("Discussão", "Solicitação", "Dúvida"),
    allowNull: true,
    defaultValue: "Dúvida",
    comment: "1 = Discussão, 2 = Solicitação, 3 = Dúvida",
  });
    await queryInterface.sequelize.query(`
    UPDATE "postagem_comunidade" SET tipo = 'Discussão' WHERE tipo IS NULL;
  `);

    await queryInterface.addColumn('postagem_comunidade', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('postagem_comunidade', 'categoria');
    await queryInterface.removeColumn('postagem_comunidade', 'tipo');
    await queryInterface.removeColumn('postagem_comunidade', 'tags');

    // IMPORTANTE: remover ENUM manualmente se necessário
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_postagem_comunidade_tipo";');
  }
};
