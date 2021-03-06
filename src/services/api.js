// Environment variables
import getEnvVars from '../../environment';
const { apiUrl } = getEnvVars();

export const editItems = (requestMethod, details, endpoint) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: requestMethod,
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

export const getItems = (endpoint) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return fetch(`${apiUrl}${endpoint}`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    })
};

export const deleteItem = (endpoint) => {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  return fetch(`${apiUrl}${endpoint}`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    })
};



export default { editItems, getItems, deleteItem };