import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getMovies( title, pageNumber ) {
    return service
      .get(`/movies/tmdb/search?title=${title}&page=${ isNaN(Number(pageNumber)) ? "1" : pageNumber }`)
      .then(res => res.data )
      .catch(errHandler);
  },

  getMovieDetailsFromTmdb(movieId) {
    return service
      .get('/movies/details/' + movieId)
      .then(res => res.data)
      .catch(errHandler);
  }
};
