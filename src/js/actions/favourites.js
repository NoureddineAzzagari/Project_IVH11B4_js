/**
 * Created by Ids van der Zee on 2-4-2017.
 */
const apiUrl= "http://localhost:8080/api/movies";
const tvShowApiUrl ="http://localhost:8080/api/tv"

/**
 * methode om een film aan de favorieten toe te voegen
 * @param id id van de film
 */
export const addToFavourites = (id) =>{
  const req = new Request(`${apiUrl}/addtofavourites/${id}`,{
    method: "POST",
    credentials: "include"
  });
  fetch(req);
};

export const addTvShowToFavourites = (id) => {
  const req = new Request(`${tvShowApiUrl}/addtofavourites/${id}`,{
    method: "POST",
    credentials: "include"
  });
  fetch(req);
}
