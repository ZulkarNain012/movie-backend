const { recommendMovies } = require("../controllers/movierecommend.controller");

module.exports = async function (fastify) {
  fastify.post("/recommend", recommendMovies);
};
