const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieDbId: Number,
  title: {
    type: String,
    required: [true, 'The movie title is required']
  },
  originalTitle: String ,
  director: String,
  plot: String,
  poster: String,
  cast: {
    type: [ String ]
  },
  genres: {
    type: [ String ]
  },
  productionCountries: {
    type: [ String ]
  },
  releaseDate: String,
  length: Number
  },
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;