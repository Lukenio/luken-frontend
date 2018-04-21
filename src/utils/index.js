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

export const format0000 = (n = 0, symbol = ',') => {
  return n.toFixed(4).replace('.', symbol);
};
