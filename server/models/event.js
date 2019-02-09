const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: true,
    enum: ["premiere", "review", "preview", "one-show"]
  },
  public: { type: Boolean, default: false },
  title: { type: String, required: true },
  subtitle: String,
  tagline: String,
  promo: String,
  dates: [ String ],
  showtimes: [ String ],
  _movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}
},
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;