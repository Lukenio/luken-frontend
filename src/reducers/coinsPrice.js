import {
  DATA_FETCH_COINS_PRICE_DATA_REQUEST,
  DATA_RECEIVE_COINS_PRICE_DATA,
  DATA_FETCH_COINS_PRICE_DATA_FAILURE,
  WANTED_COINS
} from '../constants';

const defaultState = {
  isFetching: true,
  pricesById: {},
  data: [],
  statusText: null
};

const getWantedCoinsPriceMap = coins =>
  coins.reduce(function(map, obj) {
    map[obj.id] = Number(obj.price_usd);
    console.log(map)
    // return map;
    return {"bitcoin": 5000, "ethereum": 300}
  }, {});

export default function coinsPrice(state = defaultState, action) {
  switch (action.type) {
    case DATA_FETCH_COINS_PRICE_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case DATA_RECEIVE_COINS_PRICE_DATA:
      const { data } = action.payload;
      const coins = data.filter(currency => WANTED_COINS.includes(currency.id));

      return {
        ...state,
        data,
        isFetching: false,
        pricesById: getWantedCoinsPriceMap(coins)
      };
    case DATA_FETCH_COINS_PRICE_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `${action.payload.status} - ${action.payload.statusText}`
      };
    default:
      return state;
  }
}
