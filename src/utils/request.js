import axios from 'axios';

const API_URL = process.env.REACT_APP_LUKEN_API_URL;
const key = 'e09819efd1e0c58cacb2ea0083df79b81a761934';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const responseData = response => response.data;

const handleError = error => {
  console.log('^^^', error)
  let data;

  if (error.response) {
    if (error.response.status === 500) {
      data = { message: error.response.statusText };
    } else {
      data = error;
    }
  } else {
    data = { message: 'Network Error' };
  }

  throw data;
}

// Post Request
export function postData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;

  return axios.post(requestUrl, data).then(responseData, handleError);
}

// Get Request
export function getData(url, isAuthReq = true) {
  const requestUrl = API_URL + url;
 
  return axios.get(requestUrl).then(responseData, handleError);
}

// Put Request
export function putData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;

  return axios.put(requestUrl, data).then(responseData, handleError);
}

// Patch Request
export function patchData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;

  return axios.patch(requestUrl, data).then(responseData, handleError);
}

// Delete Request
export function deleteData(url, isAuthReq = true) {
  const requestUrl = API_URL + url;

  return axios.delete(requestUrl).then(responseData, handleError);
}

export function serialize(obj, prefix) {
  const str = [];
  let p;
  for (p in obj) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p, v = obj[p]; // eslint-disable-line
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  }
  return str.join('&');
}
