console.log("Testing import...");
const ctrl = require("./src/controllers/movierecommend.controller");
console.log("Imported:", ctrl);
console.log("Keys:", Object.keys(ctrl));
if (ctrl.recommendMovies) {
  console.log("✓ recommendMovies found, type:", typeof ctrl.recommendMovies);
} else {
  console.log("✗ recommendMovies NOT found");
}
