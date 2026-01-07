const fastify = require("fastify")({ logger: true });
require("dotenv").config();

fastify.register(require("@fastify/cors"), {
  origin: "*",
});

fastify.register(require("./routes/movierecommend.routes"));

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log("Server running on port", PORT);
  } catch (err) {
    console.error("Server error:", err);
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
