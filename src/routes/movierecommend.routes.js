const { recommendMovies } = require("../controllers/movierecommend.controller");

async function routes(fastify, options) {
  fastify.post("/api/recommend", recommendMovies);
}

module.exports = routes;
