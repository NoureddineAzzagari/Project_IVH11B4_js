const apiUrl = "http://localhost:8080/api";

/**
 * stuurt een request om alle tv shows op te halen
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
 * haalt alle recent bezochte films op
 * @returns {*|Promise.<TResult>} promise die resolved in json resultaat van alle recent bezochte films
 */
export const getRecentTvShows = () =>{
  const req = new Request(apiUrl + "/tvShows/recent", {
    method: "GET",
    credentials: "include"
  });
  return fetch(req).then((response) => {
    return response.json();
  });
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

/**
 *
 * @param search
 * @param option
 * @returns {*|Promise.<TResult>}
 */
export const searchTvShows = (search, option) =>{
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
