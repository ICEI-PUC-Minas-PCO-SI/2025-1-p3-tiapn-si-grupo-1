const Flow = require("../models/flow");
const Usuario = require("../models/usuario");

const filtrosController = {
  listar: async (req, res) => {
    try {
      const categorias = await Flow.findAll({
        attributes: ["categoria"],
        group: ["categoria"],
        order: [["categoria", "ASC"]],
        raw: true,
      });

      const autores = await Usuario.findAll({
        attributes: ["id", "nome"],
        order: [["nome", "ASC"]],
        raw: true,
      });

      const allTags = await Flow.findAll({
        attributes: ["tags"],
        raw: true,
      });

      const tagsSet = new Set();
      for (const row of allTags) {
        if (Array.isArray(row.tags)) {
          row.tags.forEach((tag) => tagsSet.add(tag));
        }
      }

      const resultado = {
        categorias: categorias.map((c) => c.categoria),
        tags: Array.from(tagsSet).sort(),
        autores: autores, // <-- Agora correto
      };

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar metadados:", error);
      res.status(500).json({
        error: "Erro ao buscar categorias, tags e autores",
      });
    }
  },
};

module.exports = filtrosController;
