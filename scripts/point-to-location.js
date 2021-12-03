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
let compass = null;
let direction = null;
let element = null;

function startCompass() {
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
      .catch(() => alert("not supported"));
  }
}

function handler(e) {
  compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
  onChange();
}

function onChange() {
  if (element !== null) {
    if (direction === null) {
      element.style.visibility = 'hidden';
    } else {
      element.style.visibility = 'visible';
      if (compass === null) {
        element.style.transform = `rotate(${direction}deg)`;
      } else {
        element.style.transform = `rotate(${compass}deg)`;
      }
    }
  }
}

function pointToLocation(lat1, lon1, lat2, lon2, selector) {
  element = document.querySelector(selector);
  direction = getDistance(lat1, lon1, lat2, lon2).directionInDegrees;
  onChange();
}

startCompass();
