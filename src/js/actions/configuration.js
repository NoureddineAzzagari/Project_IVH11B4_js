const apiUrl = "http://localhost:8080/api";

/**
 * methode om de website configuratie op te halen
 * @returns {*|Promise.<TResult>} promise dat resolved in de json waarden van de configuratie
 */
export const getConfiguration = () =>{
  const req = new Request(`${apiUrl}/config`, {
    method: "GET",
    credentials: "include"
  });
  return fetch(req)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
    });
};
