export const getShows = () => {
  const req = new Request("http://localhost:8080/api/tv",{
    headers:{
      method: "GET",
      credentials: "same-origin"
    }
  });
  return fetch(req).then((response) => {return response.json();});
};

export const getShowById = (id) =>{
  const req = new Request(`http://localhost:8080/api/tv/${id}`,{
    headers:{
      method: "GET",
      credentials: "same-origin"
    }
  });
  return fetch(req).then((response) =>{return response.json();});
};
