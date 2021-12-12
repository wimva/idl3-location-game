// neem html elementen vast
const locationNameElement = document.querySelector('#location-name');
const distanceElement = document.querySelector('#distance');
const bananaPhaseElement = document.querySelector('#banana');

// definieer radius waarbinnen doelen gevonden mogen worden
const successRadiusInMeter = 20;

// banana definitions
const bananaPositions = [
  {latitude: 51.218381, longitude: 4.412834}, // Meir vs Jezusstraat
  {latitude: 51.217595, longitude: 4.419040}, // Wasbar Keyserlei
];
const bananaPhase1 = 30;
const bananaPhase2 = 20;
const bananaPhase3 = 10;
const bananaPhase4 = 5;

// haal alle query parameters op
const coordinatesParam = getQueryParam('coordinates').split(',');
const coordinates = {
  latitude: parseFloat(coordinatesParam[0]),
  longitude: parseFloat(coordinatesParam[1]),
}

const locationName = getQueryParam('locationName');
locationNameElement.textContent = locationName;

const nextPage = getQueryParam('nextPage');

// sla gegevens op in localStorage om later de draad terug op te kunnen pikken
localStorage.setItem('coordinates', coordinatesParam);
localStorage.setItem('locationName', locationName);
localStorage.setItem('nextPage', nextPage);

// show/ hide request permissions div
const requestPermissionsElement = document.querySelector('#request-permissions')
function onShowRequestPermissions() {
  requestPermissionsElement.style.display = 'block';
}

function onHideRequestPermissions() {
  requestPermissionsElement.style.display = 'none';
}
onHideRequestPermissions();

// create map
let map = null;

// when compass changes
function onCompasChange(compass) {
  if (map) {
    map.easeTo({bearing: compass, duration: 100});
  }
}

// deze functie wordt opgeroepen elke keer een nieuwe locatie doorkomt
function success(position) {

  // create map
  if (map === null) {
    map = createMap("map", position.coords.latitude, position.coords.longitude, 15, 'mapbox://styles/mapbox/streets-v11');

  // fly to current position
  } else {
    map.flyTo({ center: [position.coords.longitude, position.coords.latitude] });
  }

  // bereken afstand tussen mijn locatie en die van mijn doel
  const distance = getDistance(position.coords.latitude, position.coords.longitude, coordinates.latitude, coordinates.longitude).distance;
  // laat die afstand zien
  distanceElement.textContent = distance;

  // toon pijl die richting aangeeft
  pointToLocation(position.coords.latitude, position.coords.longitude, coordinates.latitude, coordinates.longitude, '#point-to-location', '#request-permissions-button', onShowRequestPermissions, onHideRequestPermissions, onCompasChange);

  // de afstand tussen mijn locatie en die van mijn doel is minder dan 20 meter?
  if (distance < successRadiusInMeter) {
    // navigeer naar de pagina die getoond moet worden als ik in 20 meter van locatie ben
    location.assign(`../${nextPage}/index.html`)
  }

  // banana detector
  let bananaPhase = null;
  bananaPositions.forEach(banana => {
    const bananaDistance = getDistance(position.coords.latitude, position.coords.longitude, banana.latitude, banana.longitude).distance;
    if (bananaDistance <= bananaPhase4) {
      bananaPhase = 4;
    } else if (bananaDistance <= bananaPhase3) {
      bananaPhase = 3;
    } else if (bananaDistance <= bananaPhase2) {
      bananaPhase = 2;
    } else if (bananaDistance <= bananaPhase1) {
      bananaPhase = 1;
    }
  });
  bananaPhaseElement.textContent = bananaPhase;
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

// check if page lives in the test iframe
if (isInIframe()) {

  // get map gps positions
  function handleMessage (evt) {
  	success({coords: {latitude: evt.data.lat, longitude: evt.data.lng}});
  }
  // listen to messages from test-iframe
  window.addEventListener("message", handleMessage, false);
  parent.postMessage({message: "navigate-init"}, "*");
  parent.postMessage({message: "navigate-localstorage", coordinates: coordinatesParam, locationName, nextPage}, "*");

} else {

  // options for geolocation
  const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  // access real gps data
  navigator.geolocation.watchPosition(success, error, options);
}
