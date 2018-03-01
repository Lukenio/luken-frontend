import { SERVER_URL } from './config';

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
    1: 'BCH',
    2: 'ETH'
  };
  return n[type] || 'NA';
}
