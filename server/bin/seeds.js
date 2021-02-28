'use strict';

const mongoose = require('mongoose');

const Movie = require('../models/movie');
const User = require('../models/user');

const dbName = process.env.DB_NAME || 'old-little-cinema';
const mongoPort = process.env.MONGODB_PORT || 27017;
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost_${mongoPort}/${dbName}`;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

const password = "password";

const user = new User({
  name: "test",
  email: "test@test.com",
  password,
});

const movies = [
  {
    tmdb_id: 557,
    imdb_id: "tt0145487",
    title: "Spider-Man",
    original_title: "Spider-Man",
    original_lanuage: "en",
    director: ["Sam Raimi"],
    overview: "After being bitten by a genetically altered spider, nerdy high school student Peter Parker is endowed with amazing powers.",
    poster_path: 'https://image.tmdb.org/t/p/w500/rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg',
    cast: ["Tobey Maguire", "Willem Dafoe", "Kirsten Dunst", "James Franco", "Cliff Robertson"],
    genres: ["Fantasy", "Action"],
    production_countries: ["USA"],
    release_date: "2002-05-01",
    runtime: 121,
  },
  {
    tmdb_id: 672,
    imdb_id: "tt0295297",
    title: "Harry Potter and the Chamber of Secrets",
    tagline: "Hogwarts is back in session.",
    original_title: "Harry Potter and the Chamber of Secrets",
    original_language: "en",
    director: ["Chris Columbus"],
    overview: "Ignoring threats to his life, Harry returns to Hogwarts to investigate – aided by Ron and Hermione – a mysterious series of attacks.",
    poster_path: 'https://image.tmdb.org/t/p/w500/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg',
    cast: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Richard Harris", "Alan Rickman", "Tom Felton"],
    genres: ["Adventure", "Fantasy", "Family"],
    production_countries: ["Germany", "United Kingdom", "USA"],
    release_date: "2002-11-1",
    runtime: 161,
  },
  {
    tmdb_id:675,
    imdb_id: "tt0373889",
    "title": "Harry Potter and the Order of the Phoenix",
    tagline: "Evil Must Be Confronted.",
    "original_title": "Harry Potter and the Order of the Phoenix",
    original_language: "en",
    "director": ["David Yates"],
    "overview": "Returning for his fifth year of study at Hogwarts, Harry is stunned to find that his warnings about the return of Lord Voldemort have been ignored. Left with no choice, Harry takes matters into his own hands, training a small group of students – dubbed 'Dumbledore's Army' – to defend themselves against the dark arts.",
    "poster_path": "https://image.tmdb.org/t/p/w500/4YnLxYLHhT4UQ8i9jxAXWy46Xuw.jpg",
    "cast": ["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Richard Harris", "Alan Rickman", "Tom Felton"],
    "genres": ["Adventure", "Fantasy", "Family"],
    "production_countries": ["Germany", "United Kingdom", "USA"],
    "release_date": "2007-06-28",
    "runtime":138,
  },
];

(async () => {
  try {

    await mongoose.connect(mongoUri, mongoOptions);
    
    // Reset db
    await Movie.deleteMany();
    await User.deleteMany();

    // Create Movies documents
    await Movie.create(movies);
    console.log( "Movies successfully created!")

    // Create user
    await User.create(user);
    console.log( "User successfully created!" )
    process.exit(0);

  } catch (err) {
    console.log('Error while seeding db...');
    console.trace(err);
    process.exit(1);
  }
  
})();
