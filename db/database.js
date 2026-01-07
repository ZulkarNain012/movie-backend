const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// DB file path
const dbPath = path.join(__dirname, "movies.db");

// DB connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("SQLite connection error:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS movie_recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_input TEXT,
    recommended_movies TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
