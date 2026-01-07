const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../../db/database");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

const getMovieRecommendations = async (userInput) => {
  try {
    const prompt = `
You are a movie recommendation engine.
Suggest 3-5 movies for: ${userInput}

Return ONLY valid JSON:
{
  "movies": ["Movie 1", "Movie 2"]
}
No markdown.
No explanation.
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();
    const parsed = extractJSON(text);

    if (parsed && Array.isArray(parsed.movies)) {
      await saveRecommendation(userInput, parsed.movies);
      return parsed.movies;
    }

    return [];

  } catch (error) {
    console.error("Gemini Error:", error.message);

    const fallback = [
      "Inception",
      "Interstellar",
      "The Dark Knight",
    ];

    await saveRecommendation(userInput, fallback);
    return fallback;
  }
};


function extractJSON(text) {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch (err) {
    console.error("JSON parse error:", err.message);
    return null;
  }
}

//  save data in db
function saveRecommendation(userInput, movies) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO movie_recommendations (user_input, recommended_movies)
       VALUES (?, ?)`,
      [userInput, JSON.stringify(movies)],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

module.exports = { getMovieRecommendations };
