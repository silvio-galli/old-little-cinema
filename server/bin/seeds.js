const mongoose = require('mongoose');
const Movie = require('../models/movie');

const dbName = 'old-little-cinema';
mongoose.connect(`mongodb://localhost/${dbName}`);

const movies = [
  {
    movieDbId: 557,
    title: "Spider-Man",
    originalTitle: "Spider-Man",
    director: "Sam Raimi",
    plot: "After being bitten by a genetically altered spider, nerdy high school student Peter Parker is endowed with amazing powers.",
    poster: 'https://image.tmdb.org/t/p/w500/rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg',
    cast: ["Tobey Maguire", "Willem Dafoe", "Kirsten Dunst", "James Franco", "Cliff Robertson"],
    genres: ["Fantasy", "Action"],
    productionCountries: ["USA"],
    releaseDate: "2002-05-01",
    length: 121
  },
  {
    movieDbId: 672,
    title: "Harry Potter and the Chamber of Secrets",
    originalTitle: "Harry Potter and the Chamber of Secrets",
    director: "Chris Columbus",
    plot: "Ignoring threats to his life, Harry returns to Hogwarts to investigate – aided by Ron and Hermione – a mysterious series of attacks.",
    poster: 'https://image.tmdb.org/t/p/w500/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg',
    cast: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Richard Harris", "Alan Rickman", "Tom Felton"],
    genres: ["Adventure", "Fantasy", "Family"],
    productionCountries: ["Germany", "United Kingdom", "USA"],
    releaseDate: "2002-11-1",
    length: 161
  },
  {
    "movieDbId":675,
    "title":"Harry Potter and the Order of the Phoenix",
    "originalTitle":"Harry Potter and the Order of the Phoenix",
    "director":"David Yates",
    "plot":"Returning for his fifth year of study at Hogwarts, Harry is stunned to find that his warnings about the return of Lord Voldemort have been ignored. Left with no choice, Harry takes matters into his own hands, training a small group of students – dubbed 'Dumbledore's Army' – to defend themselves against the dark arts.",
    "poster":"https://image.tmdb.org/t/p/w500/4YnLxYLHhT4UQ8i9jxAXWy46Xuw.jpg",
    "cast":["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Richard Harris", "Alan Rickman", "Tom Felton"],
    "genres":["Adventure", "Fantasy", "Family"],
    "productionCountries":["Germany", "United Kingdom", "USA"],
    "releaseDate":"2007-06-28",
    "length":138
  }
]

Movie.create(movies, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${movies.length} movies`)
  console.log(movies);
  mongoose.connection.close();
});