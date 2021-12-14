// haal query params op
/* eslint-disable no-unused-vars */
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
