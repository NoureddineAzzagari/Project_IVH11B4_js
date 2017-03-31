const apiUrl = "http://localhost:8080/";

export const getUserInfo = () =>{
  const req = new Request(`${apiUrl}getUserInfo`,{
    method: "GET",
    credentials: "include"
  });
  return fetch(req)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      else{
        return false;
      }
    })
};
