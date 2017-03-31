const apiUrl = "http://localhost:8080/api";

/**
 * stuurd een request om alle tv shows op te halen
 * @returns {Promise.<TResult>} json resultaat van de tv shows als promise
 */
export const getShows = () => {
  const req = new Request(`${apiUrl}/tv`,{
    method: "GET",
    credentials: "include"
  });
  return fetch(req).then((response) => {return response.json();});
};

/**
 * stuurt een request om informatie over een tv show op te halen aan de hand een id
 * @param id id van de op te halen tv show
 * @returns {Promise.<TResult>} json resultaat van de opgehaalde tv show als promise
 */
export const getShowById = (id) =>{
  const req = new Request(`${apiUrl}/tv/${id}`,{
    method: "GET",
    credentials: "include"
  });
  return fetch(req).then((response) =>{return response.json();});
};
