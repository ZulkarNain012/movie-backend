const fastify = require("fastify")({ logger: true });
require("dotenv").config();

fastify.register(require("@fastify/cors"), {
  origin: "*",
});

fastify.addHook("onRequest", (request, reply, done) => {
  reply
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    .header("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    reply.status(200).send();
    return;
  }
  done();
});

// routes
fastify.register(require("./routes/movierecommend.routes"));

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log("Server running on port", PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
