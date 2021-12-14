module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-console': 'warn',
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  globals: {
    getQueryParam: false,
    createMap: false,
    createMarker: false,
    create: false,
    getDistance: false,
    pointToLocation: false,
    getMicrophone: false,
    isInIframe: false,
    getNextPage: false,
    mapboxgl: false,
    mapboxAccessToken: false,
  },
};
