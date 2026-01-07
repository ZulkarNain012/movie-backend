const { getMovieRecommendations } = require("../services/movieService");

const recommendMovies = async (request, reply) => {
  const { userInput } = request.body;
  console.log("Received userInput:", userInput);
  console.log("This is calling of userInput:", typeof userInput);

  if (!userInput) {
    return reply.status(400).send({ error: "Input required" });
  }

  try {
    const movies = await getMovieRecommendations(userInput);
    return reply.send({ input: userInput, movies });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Something went wrong" });
  }
};

module.exports = { recommendMovies };
