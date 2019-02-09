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
      .get(`movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${title}&page=${ isNaN(Number(pageNumber)) ? "1" : pageNumber }`)
      .then(res => res.data )
      .catch(errHandler);
  },

  getTmdbPage(title, pageNumber) {
    return service
      // .get(`movie?api_key=${MOVIEDB_API_KEY}&query=${title}&page=${pageNumber}`)
      // .then(res => res.data )
      // .catch(errHandler);
  },

  getMovieDetails(movieId) {
    console.log( "GET MOVIE DETAILS CALL for movie id = ", movieId )
    return axios
      // .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIEDB_API_KEY}&append_to_response=credits`)
      // .then(res => res.data)
      // .catch(errHandler);
  },

  getMovieDetailsFromTmdb(movieId) {
    console.log( "GET MOVIE DETAILS CALL for movie id = ", movieId )
    return service
      .get('/movies/details/' + movieId)
      .then(res => res.data)
      .catch(errHandler);
  }
};
