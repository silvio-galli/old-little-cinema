const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  tagline: String,
  promo: String,
  startingDate: Date,
  endingDate: Date,
  movieList: [{
    date: Date,
    showtime: String,
    _movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
  }]
},
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;