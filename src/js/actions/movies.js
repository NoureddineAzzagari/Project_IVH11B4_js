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
 * haalt alle recent bezochte films op
 * @returns {*|Promise.<TResult>} promise die resolved in json resultaat van alle recent bezochte films
 */
export const getRecentMovies = () =>{
  const req = new Request(apiUrl + "/movies/recent", {
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
  const form = new FormData();
  form.append("searchString", search);
  form.append("searchOption", option);
  const req = new Request(`${apiUrl}/movies/search`,{
    method: "POST",
    credentials: "include",
    body: form
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
 * subject class voor het observer pattern voor de filter/zoek optie
 */
export class FilterSubject{
  constructor(){
    this.observers = [];
    this.state = [];
    this.isFilter = true;
    FilterSubject.updateMovies = FilterSubject.updateMovies.bind(this);
    FilterSubject.cancelFilter = FilterSubject.cancelFilter.bind(this);
  }

  /**
   * voegt een nieuwe observer toe aan de lijst van observers
   * @param observer nieuwe observer
   */
  attach(observer){
    this.observers.push(observer);
  }

  /**
   * haalt de current state op
   * @returns {*|Array}
   */
  getState(){
    return this.state;
  }

  /**
   * set een nieuwe state
   * @param result
   */
  setState(result){
    this.state = result;
    this.notify();
  }

  /**
   * update de de movies in state
   * @param movies
   */
  static updateMovies(movies){
    this.isFilter = true;
    this.state = movies;
    this.notify();
  }

  /**
   * stopt de filter om weer alle resultaten te tonen
   */
  static cancelFilter(){
    this.isFilter = false;
    this.notify()
  }

  /**
   * notified alle subscribers
   */
  notify(){
    for(let observer of this.observers){
      observer.updateSearch(this.state, this.isFilter);
    }
  }

}

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
