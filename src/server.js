const fastify = require("fastify")({ logger: true });
require("dotenv").config();

// Use Fastify CORS plugin to properly handle preflight and CORS headers
fastify.register(require("@fastify/cors"), {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
});

// routes (prefixed with /api)
fastify.register(require("./routes/movierecommend.routes"), {
  prefix: "/api",
});


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
