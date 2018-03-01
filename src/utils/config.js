export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || 'http://luken-qa.herokuapp.com';

// config should use named export as there can be different exports,
// just need to export default also because of eslint rules
export { SERVER_URL as default };
