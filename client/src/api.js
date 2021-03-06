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
  
  // GET all movies
  getMovies() {
    return service
      .get('/movies')
      .then(res => res.data)
      .catch(errHandler);
  },

  // GET one movie
  getMovie(movieId) {
    return service
      .get('/movies/' + movieId)
      .then(res => res.data)
      .catch(errHandler);
  },

  // POST /movies
  postMovies(data) {
    return service
      .post('/movies', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  // SEARCH movies by title
  searchMovies(text) {
    return service
      .get('/movies/search?title=' + text)
      .then(res => res.data)
      .catch(errHandler)
  },

  postMovieDetails(movieId, data){
    //console.log(`inside Api movieId -->`, movieId)
    return service
      .post(`/movies/${movieId}`, data)
      .then(res => res.data)
      .catch(errHandler);
   },

   getEvents() {
    return service
      .get('/events')
      .then(res => res.data)
      .catch(errHandler);
  },

  getLastNEvents(n=15) {
    return service
      .get('/events/last/:n')
      .then(res => res.data)
      .catch(errHandler);
  },

  getEvent(eventId) {
    return service
      .get('/events/' + eventId)
      .then(res => res.data)
      .catch(errHandler);
  },

  postEvents(data) {
    return service
      .post('/events', data)
      .then(res => res.data)
      .catch(errHandler);
  },

  updateEvents(data) {
    return service
      .post('/events/' + data._id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteEvent(eventId) {
    return service
      .delete('/events/' + eventId)
      .then(res => res.data)
      .catch(errHandler)
  },
  
  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },
  
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },

  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  }
};
