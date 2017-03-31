const apiUrl = "http://localhost:8080/api";

/**
 * stuurt een request om alle films op te halen
 * @returns {Promise.<TResult>} json resultaat van alle films als promise
 */
export const getMovies = () => {
  const req = new Request(apiUrl + "/movies", {
    method: "GET",
    credentials: "include"
  });
  return fetch(req).then((response) => {
    return response.json();
  });
};

/**
 *
 * @param search
 * @param option
 * @returns {*|Promise.<TResult>}
 */
export const searchMovies = (search, option) =>{
  const req = new Request(`${apiUrl}/movies/search`,{
    method: "POST",
    credentials: "include"
  });
  return fetch(req).then((response) => {
    return response.json();
  })
};

/**
 * stuurd een request om een film op te halen aan de hand van een id
 * @param id id van de op te halen film
 * @returns {Promise.<TResult>} json resultaat van de op te halen film
 */
export const getMovieById = (id) => {
  const req = new Request(`${apiUrl}/movies/${id}`, {
    method: "GET",
    credentials: "include"
  });
  return fetch(req).then((response) => {
    return response.json();
  });
};

/**
 * stuurd een request om een nieuwe film toe te voegen
 * @param movie toe te voegen film
 */
export const addMovie = (movie) => {
  let movieForm = new FormData();
  movieForm.append("title", movie.title);
  movieForm.append("year", movie.releaseDate);

  const req = new Request(`${apiUrl}/movies/add`, {
    method: "POST",
    credentials: "include",
    body: movieForm
  })
};

/**
 * subject klasse voor het observer pattern
 */
export class Subject {
  constructor() {
    this.observers = [];
    this.state = [];
    getMovies()
      .then((movies)=>{
        this.setState((movies));
      });
  }

  /**
   * voegt een nieuwe observer toe aan de lijst van observers
   * @param observer
   */
  attach(observer) {
    this.observers.push(observer);
  }

  /**
   * haalt de current state op
   * @returns {*|Array} lijst van films
   */
  getState(){
    return this.state;
  }

  /**
   * set de state
   * @param result resultaat te setten als state
   */
  setState(result){
    this.state = result;

    this.notify();
  }

  /**
   * stuurt een bericht naar alle observers
   */
  notify(){
    for(let observer of this.observers){
      observer.update(this.state);
    }
  }
}
