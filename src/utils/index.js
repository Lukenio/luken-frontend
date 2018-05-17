export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {};
  });
}

export function getCRTickerSymbols(type) {
  const n = {
    0: 'BTC',
    1: 'ETH'
  };
  return n[type] || 'NA';
}

export function getCRTickerTitle(type) {
  const n = {
    0: 'Bitcoin',
    1: 'Ethereum'
  };
  return n[type] || 'NA';
}

export function omit(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

export function parseQueryString(str) {
  return str.slice(1).split('&').reduce((params, pair) => {
    let [key, value] = pair.split('=');
    params[key] = value;
    return params;
  }, {});
}

export const format0000 = (n = 0, symbol = ',', f = 4) => {
  return n.toFixed(f).replace('.', symbol);
};

export const createFormError = (fieldNames = [], opts = {}) => (error) => {
  return new Promise((resolve) => {
    if (
      error &&
      typeof error.response !== 'undefined' &&
      error.response.status === 401
    ) {
      // Invalid authentication credentials
      resolve({
        _error: error.message
      });
    } else if (
      error &&
      typeof error.response !== 'undefined' &&
      error.response.status >= 500
    ) {
      // Server side error
      resolve({
        _error: 'A server error occurred while sending your data!'
      });
    } else if (
      error &&
      typeof error.response !== 'undefined' &&
      error.response.status === 400
    ) {
      // Bad request error
      error.response.json().then((data) => {
        const wrapValue = v => Array.isArray(v) ? v : [v];

        let formError = fieldNames.reduce((acc, fname) => {
          if (data[fname]) {
            acc[fname] = wrapValue(data[fname]);
          }
          return acc;
        }, {});

        if (opts._error) {
          formError._error = opts._error;
        } else {
          let other = Object.keys(data).reduce((acc, key) => {
            if ([...fieldNames, 'detail'].indexOf(key) === -1) {
              return [...acc, ...wrapValue(data[key])];
            }
            return acc;
          }, [])
  
          formError._error = [
            ...wrapValue(data.detail || []),
            ...other
          ];
        }

        Object.keys(formError).forEach((k) => {
          formError[k] = formError[k].join(' ');
        });

        resolve(formError);
      });
    } else {
      // Most likely connection issues
      resolve({
        _error: 'An error occurred while sending your data!'
      });
    }
  });
};
