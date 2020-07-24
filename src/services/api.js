// Environment variables
import getEnvVars from '../../environment';
const { apiUrl } = getEnvVars();

export const putItem = (details, endpoint) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(details),
    redirect: 'follow'
  };

  return fetch(`${apiUrl}${endpoint}`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return { error };
    })   
};

export default { putItem };