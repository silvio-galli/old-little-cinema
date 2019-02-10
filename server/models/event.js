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
  poster: {
      type: String, default:'https://user-images.githubusercontent.com/15610747/52535184-a83edd00-2d4b-11e9-8b93-80eb97919a4c.png'
  },
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