// neem html elementen vast
const progressElement = document.querySelector('#progress');
const bananaCollection = document.querySelector('#banana-collection');
const bananaCollectionCollected = document.querySelector(
  '#banana-collection-collected',
);
const bananaCollectionTotal = document.querySelector(
  '#banana-collection-total',
);
const navigateContent = document.querySelector('#navigate-content');
const bananaSonar = document.querySelector('#banana-sonar');
const debugElement = document.querySelector('#debug');

// debug
const debug = localStorage.getItem('debug');
if (debug === 'true') debugElement.style.display = 'block';

// definieer radius waarbinnen doelen gevonden mogen worden
const successRadiusInMeter = 20;

// banana definitions
const bananaMax = 7;
const bananaPositions = [
  { latitude: 51.218381, longitude: 4.412834 }, // Meir vs Jezusstraat
  { latitude: 51.217518, longitude: 4.418973 }, // Wasbar Keyserlei
  { latitude: 51.218115, longitude: 4.41921 }, // Breydelstraat vs Statiestraat
  { latitude: 51.21929, longitude: 4.418484 }, // Rooseveltplaats
  { latitude: 51.220794, longitude: 4.41565 }, // Korte Winkelstraat
  { latitude: 51.219781, longitude: 4.415434 }, // Kipdorp
  { latitude: 51.219491, longitude: 4.412266 }, // Campus LNI
  { latitude: 51.221262, longitude: 4.41227 }, // Speeltuin Frans Halsplein
  { latitude: 51.220678, longitude: 4.410003 }, // Sint Jacobsmarkt
  { latitude: 51.222744, longitude: 4.41056 }, // UA
  { latitude: 51.221713, longitude: 4.413793 }, // Ossenmarkt
  { latitude: 51.222067, longitude: 4.413956 }, // Begijnhof
  { latitude: 51.225176, longitude: 4.409853 }, // Paardenmarkt
  { latitude: 51.224965, longitude: 4.412349 }, // Paardenmarkt
  { latitude: 51.225671, longitude: 4.410869 }, // Stijfselrui
  { latitude: 51.228235, longitude: 4.40927 }, // Haven MAS
  { latitude: 51.228295, longitude: 4.407833 }, // Haven MAS
  { latitude: 51.227395, longitude: 4.407852 }, // FelixArchief
  { latitude: 51.227121, longitude: 4.405379 }, // Oude Leeuwenrui
  { latitude: 51.229616, longitude: 4.402194 }, // Bonapartedok
  { latitude: 51.23096, longitude: 4.403076 }, // Friendship Building
  { latitude: 51.230248, longitude: 4.4041 }, // Nassaustraat
  { latitude: 51.230694, longitude: 4.40555 }, // Cremerie Germaine
  { latitude: 51.231449, longitude: 4.404206 }, // Amsterdamstraat
];
const bananaPhase1 = 20;
const bananaPhase2 = 15;
const bananaPhase3 = 10;
const bananaPhase4 = 5;
let bananaFoundAnimationInProgress = false;
let bananaFound = [];
if (localStorage.getItem('bananaFound')) {
  bananaFound = JSON.parse(localStorage.getItem('bananaFound'));
}
bananaCollectionTotal.textContent = bananaMax;

function startBananaFoundAnimation() {
  bananaFoundAnimationInProgress = true;
  const sonarBanana = document.querySelector('.banana-sonar-banana');
  const sonarCheck = document.querySelector('.banana-sonar-check');
  const sonarBackground = document.querySelector(
    '.banana-sonar-full-background',
  );
  setTimeout(() => {
    sonarBanana.style.transform = `translateY(-30px) scale(1.5, 1.5)`;
  }, 200);
  setTimeout(() => {
    sonarBanana.style.transform = `translateY(300px) scale(0.75, 0.75)`;
    sonarBanana.style.opacity = 0;
    sonarCheck.style.transform = `rotate(45deg) scale(0.25, 0.25)`;
    sonarCheck.style.opacity = 0;
    sonarBackground.style.opacity = 0;
  }, 1000);
  setTimeout(() => {
    bananaFoundAnimationInProgress = false;
    navigateContent.className = '';
    bananaSonar.className = 'banana-sonar-phase-0';
    bananaCollectionCollected.textContent = bananaFound.length;
  }, 2000);
  setTimeout(() => {
    // reset
    sonarBanana.style.transform = ``;
    sonarBanana.style.opacity = 1;
    sonarCheck.style.transform = ``;
    sonarCheck.style.opacity = 1;
    sonarBackground.style.opacity = 1;
  }, 2100);
}

// haal alle query parameters op
const locationName = getQueryParam('locationName');
const nextPage = getQueryParam('nextPage');
const coordinatesParam = getQueryParam('coordinates').split(',');
const coordinates = {
  latitude: parseFloat(coordinatesParam[0]),
  longitude: parseFloat(coordinatesParam[1]),
};
let startCoordinatesParam = getQueryParam('startCoordinates');
let startCoordinates = null;
if (startCoordinatesParam && startCoordinatesParam != 'null') {
  let startCoordinatesArray = startCoordinatesParam.split(',');
  startCoordinates = {
    latitude: parseFloat(startCoordinatesArray[0]),
    longitude: parseFloat(startCoordinatesArray[1]),
  };
}

// sla gegevens op in localStorage om later de draad terug op te kunnen pikken
localStorage.setItem('startCoordinates', startCoordinatesParam);
localStorage.setItem('coordinates', coordinatesParam);
localStorage.setItem('locationName', locationName);
localStorage.setItem('nextPage', nextPage);

// show/ hide banana-collection
if (nextPage === 'zoo') {
  bananaCollection.style.display = 'none';
} else {
  bananaCollection.style.display = 'flex';
}

// show/ hide request permissions div
const requestPermissionsElement = document.querySelector(
  '#request-permissions',
);
function onShowRequestPermissions() {
  requestPermissionsElement.style.display = 'block';
}

function onHideRequestPermissions() {
  requestPermissionsElement.style.display = 'none';
}
onHideRequestPermissions();

// create map variables
let map = null;
let mapCompass = null;
let mapCenter = null;

// when compass changes
function onCompasChange(compass) {
  mapCompass = compass;
  onMapChange();
}

// apply changes to map
function onMapChange() {
  if (map) {
    const goal = { duration: 100 };

    if (mapCompass) goal.bearing = mapCompass;
    if (mapCenter) goal.center = mapCenter;

    map.easeTo(goal);
  }
}

// bereken afstand tussen start en doel
let totalDistance = 1;
function calculateTotalDistance() {
  if (startCoordinatesParam && startCoordinatesParam !== 'null') {
    totalDistance = getDistance(
      startCoordinates.latitude,
      startCoordinates.longitude,
      coordinates.latitude,
      coordinates.longitude,
    ).distance;
  }
}
calculateTotalDistance();

// deze functie wordt opgeroepen elke keer een nieuwe locatie doorkomt
debugElement.textContent = 'no GPS found';
function success(position) {
  debugElement.textContent =
    'GPS found: ' + position.coords.latitude + ',' + position.coords.longitude;
  mapCenter = [position.coords.longitude, position.coords.latitude];

  // als startLocatie niet gekend is, sla die coordinaten dan zo op
  if (!startCoordinatesParam || startCoordinatesParam === 'null') {
    startCoordinatesParam = `${position.coords.latitude},${position.coords.longitude}`;
    localStorage.setItem('startCoordinates', startCoordinatesParam);
    startCoordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    calculateTotalDistance();
  }

  // create map
  if (map === null) {
    map = createMap(
      'map',
      position.coords.latitude,
      position.coords.longitude,
      16,
      'mapbox://styles/vaw-be-ap/ckx5zf9v40neq15rryvwq6pa6',
    );
    debugElement.textContent = `create map ${position.coords.latitude},${position.coords.longitude}`;
    map.on('load', () => {
      debugElement.textContent = `map loaded ${position.coords.latitude},${position.coords.longitude}`;
      document.querySelector('body').style.backgroundImage =
        "url('../../images/general/backgrounds/orangeBG.png')";
      document.querySelector('#map').style.opacity = 0.9;
      document.querySelector('#navigate-content').style.display = 'block';
      document.querySelector('#loading-container').style.display = 'none';
    });

    // fly to current position
  } else {
    debugElement.textContent = `map change ${position.coords.latitude},${position.coords.longitude}`;
    onMapChange();
  }

  // bereken afstand tussen mijn locatie en die van mijn doel
  const distance = getDistance(
    position.coords.latitude,
    position.coords.longitude,
    coordinates.latitude,
    coordinates.longitude,
  ).distance;
  let distanceProgress = 1 - distance / totalDistance;
  if (distanceProgress > 1) distanceProgress = 1;
  if (distanceProgress < 0) distanceProgress = 0;

  // laat die afstand zien
  console.log(
    'distance: ' + distance + ' / ' + totalDistance + ' : ' + distanceProgress,
  );
  progressElement.style.width = 184 * distanceProgress + 'px';

  // toon pijl die richting aangeeft
  pointToLocation(
    position.coords.latitude,
    position.coords.longitude,
    coordinates.latitude,
    coordinates.longitude,
    '#point-to-location',
    '#request-permissions-button',
    onShowRequestPermissions,
    onHideRequestPermissions,
    onCompasChange,
  );

  // de afstand tussen mijn locatie en die van mijn doel is minder dan 20 meter?
  if (distance < successRadiusInMeter) {
    // navigeer naar de pagina die getoond moet worden als ik in 20 meter van locatie ben
    location.assign(`../${nextPage}/index.html`);
  }

  // banana detector
  let bananaPhase = 0;
  let bananaFoundIndex = 0;
  if (bananaFound.length < bananaMax && nextPage !== 'zoo') {
    bananaPositions.forEach((banana, index) => {
      if (bananaFound.indexOf(index) == -1) {
        const bananaDistance = getDistance(
          position.coords.latitude,
          position.coords.longitude,
          banana.latitude,
          banana.longitude,
        ).distance;
        if (bananaDistance <= bananaPhase4) {
          bananaPhase = 4;
          bananaFoundIndex = index;
        } else if (bananaDistance <= bananaPhase3) {
          bananaPhase = 3;
        } else if (bananaDistance <= bananaPhase2) {
          bananaPhase = 2;
        } else if (bananaDistance <= bananaPhase1) {
          bananaPhase = 1;
        }
      }
    });
  }

  console.log(
    'bananas: ' + bananaPhase + ' - ' + bananaFound.length + ' / ' + bananaMax,
  );
  if (!bananaFoundAnimationInProgress) {
    if (bananaPhase) {
      navigateContent.className = 'banana-sonar-active';
    } else {
      navigateContent.className = '';
    }
    bananaSonar.className = 'banana-sonar-phase-' + bananaPhase;
    bananaCollectionCollected.textContent = bananaFound.length;

    if (bananaPhase === 4) {
      startBananaFoundAnimation();
      bananaFound.push(bananaFoundIndex);
      localStorage.setItem('bananaFound', JSON.stringify(bananaFound));
    }
  }
}

// error for GPS
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

// get map gps positions from iFrame
function handleMessage(evt) {
  success({ coords: { latitude: evt.data.lat, longitude: evt.data.lng } });
}

// check if page lives in the test iframe
if (isInIframe()) {
  // listen to messages from test-iframe
  window.addEventListener('message', handleMessage, false);
  parent.postMessage({ message: 'navigate-init' }, '*');
  parent.postMessage(
    {
      message: 'navigate-localstorage',
      startCoordinates: startCoordinatesParam,
      bananaFound: JSON.stringify(bananaFound),
      coordinates: coordinatesParam,
      locationName,
      nextPage,
    },
    '*',
  );
} else {
  // options for geolocation
  const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0,
  };

  // access real gps data
  navigator.geolocation.watchPosition(success, error, options);
}
