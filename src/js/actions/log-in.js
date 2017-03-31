const apiUrl = "http://localhost:8080";

/**
 * stuurd een request naar de server om in te loggen
 * @param userName gebruiekers naam
 * @param password wachtwoord
 * @returns {Promise.<TResult>} json resultaat van de inlog pogin als promise (true als gelukt anders false)
 */
export const login = (userName, password) =>{
  const form = new FormData();
  form.append("userName", userName);
  form.append("password", password);
  const req = new Request(`${apiUrl}/login`,{
    method: "POST",
    credentials: "include",
    body: form
  });
  return fetch(req).then((response) =>{
    if(response.ok) return response.json();
    else return 500;
  })
};
