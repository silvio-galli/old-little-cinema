var express = require('express');
const Event = require('../models/event')

var router = express.Router();

// Route to get all events
router.get('/', (req, res, next) => {
  Event.find()
  .populate('_movie')
  .then(events => {
    res.json(events);
  })
  .catch(err => next(err))
});

router.get('/:eventId', (req,res,next) => {
  Event.findById(req.params.eventId)
  .populate('_movies')
  .then( event => {
    res.json(event);
  })
  .catch(err => next(err))
});

// create new event
router.post('/', (req, res, next) => {
  let { title, subtitle, tagline, promo, startingDate, endingDate, dates, showtimes, _movies } = req.body;
  Event.create( { title, subtitle, tagline, promo, startingDate, endingDate, dates, showtimes, _movies } )
  .then( newEvent => {
    res.json({
      success: true,
      newEvent
    });
  })
  .catch( err => next(err));
});


module.exports = router;
