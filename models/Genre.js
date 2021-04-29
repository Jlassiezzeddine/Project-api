const mongoose = require("mongoose");


const genreSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "a Genre must have a name"] , unique: true },
    count: { type: Number, default: 0 },
    movieId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);


const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
