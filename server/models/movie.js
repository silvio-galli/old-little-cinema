const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdb_id: Number,
  imdb_id: String,
  title: {
    type: String,
    required: [true, 'The movie title is required']
  },
  tagline: String,
  original_title: String ,
  original_language: String,
  director: {
    type: [ String ]
  },
  overview: String,
  poster_path: String,
  cast: {
    type: [ String ]
  },
  genres: {
    type: [ String ]
  },
  production_countries: {
    type: [ String ]
  },
  release_date: String,
  runtime: Number,
  external_links: {
    type: [String]
  }
  },
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;