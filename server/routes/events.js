var express = require('express');
const Event = require('../models/event')

var router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Event.find()
  .then(events => {
    res.json(events);
  })
  .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { title, subtitle, tagline, promo, startingDate, endingDate } = req.body;
});


module.exports = router;
