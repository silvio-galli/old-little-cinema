import axios from 'axios';

const MOVIEDB_API_KEY = '187833d4f410703c240782d20b5d2bab';

const service = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search'
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getMovies( title, pageNumber ) {
    return service
      .get(`movie?api_key=${MOVIEDB_API_KEY}&query=${title}&page=${ isNaN(Number(pageNumber)) ? pageNumber : "1" }`)
      .then(res => res.data )
      .catch(errHandler);
  },

  getTmdbPage(title, pageNumber) {
    return service
      .get(`movie?api_key=${MOVIEDB_API_KEY}&query=${title}&page=${pageNumber}`)
      .then(res => res.data )
      .catch(errHandler);
  },

  getMovieDetails(movieId) {
    console.log( "GET MOVIE DETAILS CALL for movie id = ", movieId )
    return axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIEDB_API_KEY}&append_to_response=credits`)
      .then(res => res.data)
      .catch(errHandler);
  }
};
