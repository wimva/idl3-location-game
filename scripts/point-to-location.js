/*

Maak een image aan met een pijl die naar boven wijst.

Op computer zal kompas altijd het noorden aanwijzen, dus rekeninghoudend met een normale kaart-oriëntatie.
Op telefoon zal deze rekening houden met het kompas van de telefoon zelf.

//
// .html
//

// head:

<script defer src="../../scripts/get-distance.js"></script>
<script defer src="../../scripts/point-to-location.js"></script>

// body:

<img src="path/to/arrow.svg" alt="volg mij" id="point-to-location"/>

//
// .js
//

function success(postion) {
  pointToLocation(position.coords.latitude, position.coords.longitude, coordinates.latitude, coordinates.longitude, '#point-to-location');
}

...

navigator.geolocation.watchPosition(success, error, options);

*/

/* Source: https://dev.to/orkhanjafarovr/real-compass-on-mobile-browsers-with-javascript-3emi */
const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
let compassStarted = false;
let compassStartedViaClick = false;
let compass = null;
let direction = null;
let pointerElement = null;
let requestPermissionsButtonElement = null;
let showRequestPermissions = null;
let hideRequestPermissions = null;

function startCompass() {
  if (!compassStarted) {
    compassStarted = true;
    if (!isIOS) {
      window.addEventListener("deviceorientationabsolute", handler, true);
    } else {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handler, true);
          } else {
            alert("has to be allowed!");
          }
        })
        .catch(() => {
          if (compassStartedViaClick) {
            alert("Kompas niet beschikbaar. Richtingaanwijzing via het noorden.")
          } else {
            showRequestPermissions();
            requestPermissionsButtonElement.onclick = () => {
              compassStartedViaClick = true;
              compassStarted = false;
              hideRequestPermissions();
              startCompass();
            }
          }
        });
    }
  }
}

function handler(e) {
  compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
  onChange();
}

function onChange() {
  if (pointerElement !== null) {
    if (direction === null) {
      pointerElement.style.visibility = 'hidden';
    } else {
      pointerElement.style.visibility = 'visible';
      if (compass === null) {
        pointerElement.style.transform = `rotate(${direction}deg)`;
      } else {
        document.querySelector('#log').textContent = compass;
        pointerElement.style.transform = `scale(-1, 1) rotate(${-compass}deg)`;
      }
    }
  }
}

function pointToLocation(lat1, lon1, lat2, lon2, pointerSelector, requestPermissionsButtonSelector, onShowRequestPermissions, onHideRequestPermissions) {
  showRequestPermissions = onShowRequestPermissions;
  hideRequestPermissions = onHideRequestPermissions;

  requestPermissionsButtonElement = document.querySelector(requestPermissionsButtonSelector);
  pointerElement = document.querySelector(pointerSelector);

  direction = getDistance(lat1, lon1, lat2, lon2).directionInDegrees;

  startCompass();
  onChange();
}
