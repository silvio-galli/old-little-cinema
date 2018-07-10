const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieDbId: { Number },
  title: {
    type: String,
    required: [true, 'The movie name is required']
  },
  originalTitle: { String },
  director: { String },
  plot: { String },
  poster: { String },
  cast: {
    type: [ String ]
  },
  genres: {
    type: [ String ]
  },
  productionContries: {
    type: [ String ]
  },
  releaseDate: { Date },
  length: { Number }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;