const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: [true, "a Genre must have a name"] },
  count: Number,
  movieId :[{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports= Genre ; 