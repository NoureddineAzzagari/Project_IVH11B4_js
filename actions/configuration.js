const apiUrl = "http://localhost:8080/api";

export const getConfiguration = () =>{
  const req = new Request(`${apiUrl}/config`, {
    method: "GET",
    headers:{
      credentials: "same-origin"
    }
  });
  return fetch(req)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
    });
};
