const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieInfos: {
    poster_path: {
      type: String,
      required: [true, "Please provide a poster link/image"],
    },
    backdrop_path: {
      type: String,
      required: [true, "Please provide a backdrop link/image"],
    },
    adult: { type: Boolean, default: false, required: true },
    budget: {type :String },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    // genres:[{type : String}],
    orginial_language: {type : String },
    original_title: {
      type: String,
      required: [true, "Movie must have an original title"],
    },
    overview: { type: String, required: [true, "Movie must have an overview"] },
    popularity: {type : Number},
    release_date: {type : Date},
    runtime: {type : Number},
    status: { type:String ,
      enum: ["Unplanned", "Planned", "Canceled"],
      default: "Unplanned",
    },
    tagline: {type :String} ,
    title: {type:String},
    trailer_url: {type: String},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

const Movie =mongoose.model("Movie", movieSchema);
module.exports= Movie ; 
