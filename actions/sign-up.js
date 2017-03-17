const apiUrl = "http://localhost:8080/api";

/**
 * stuurd een request naar de server met nieuwe gebruikers informatie om zo een nieuwe gebruiker toe te voegen
 * @param userInfo invormatie over de gebruiker
 * @returns {*} promise van de request
 */
export const signUp = (userInfo) => {
  const req = new Request(`${apiUrl}/signup`, {
    method: "POST",
    headers: {
      credentials: "same-origin"
    },
    body: userInfo
  });
  return fetch(req);
};
