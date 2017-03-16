export const login = (userName, password) =>{

  const form = new FormData();
  form.append("userName", userName);
  form.append("password", password);
  const req = new Request(`${location.origin}/login`,{
    headers:{
      method: "POST",
      credentials: "same-origin"
    },
    body: form
  });
  return fetch(req).then((response) =>{
    return response.json();
  })
};
