const fastify = require("fastify")({ logger: true });
require("dotenv").config();

fastify.register(require("@fastify/cors"), {
  origin: "*",
});

fastify.register(require("./routes/movierecommend.routes"));

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:5000");
  } catch (err) {
    console.error("Server error:", err);
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
