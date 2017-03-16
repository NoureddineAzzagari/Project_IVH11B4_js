export const getMovies = () => {
  const req = new Request("http://localhost:8080/api/movies", {
    headers: {
      method: "GET",
      credentials: "same-origin"
    }
  });
  return fetch(req).then((response) => {
    return response.json();
  });
};

export const getMovieById = (id) => {
  const req = new Request(`http://localhost:8080/api/movies/${id}`, {
    headers: {
      method: "GET",
      credentials: "same-origin"
    }
  });
  return fetch(req).then((response) => {
    return response.json();
  });
};

export class Subject {
  constructor() {
    this.observers = [];
    this.state = [];
    getMovies()
      .then((movies)=>{
        this.setState((movies));
      });
  }

  attach(observer) {
    this.observers.push(observer);
  }

  getState(){
    return this.state;
  }

  setState(result){
    this.state = result;

    this.notify();
  }

  notify(){
    for(let observer of this.observers){
      observer.update();
    }
  }
}
