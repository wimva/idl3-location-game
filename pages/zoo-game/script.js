const countDownElement = document.querySelector('#countdown');
const countDown3Element = document.querySelector('#countdown-3');
const countDown2Element = document.querySelector('#countdown-2');
const countDown1Element = document.querySelector('#countdown-1');
const volumeElement = document.querySelector('#volume-meter');
const successElement = document.querySelector('#volume-success');
const failedElement = document.querySelector('#volume-failed');

/* microphone */
const audioVolumeArray = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
let now = new Date().getTime();
let microphoneReady = false;
let maxVolume = 0;
let volumeThreshold = 50;
let maxAttempts = 3;
let attempts = 0;

function microphoneSuccess(volume) {
  if (!microphoneReady) {
    startCountdown();
    microphoneReady = true;
  }
  const newNow = new Date().getTime();
  if (newNow > now + 20) {
    now = newNow;
    audioVolumeArray.unshift(Math.round(volume));
    audioVolumeArray.pop();

    if (volume > maxVolume) {
      maxVolume = volume;
    }

    drawVolume();
  }
}

getMicrophone(microphoneSuccess);

function drawVolume() {
  audioVolumeArray.forEach((volume, i) => {
    if (i === 0) {
      document.querySelector(`#vol-0`).style.height =
        (71 * volume) / 100 + 5 + 'px';
    } else {
      document.querySelector(`#vol-l${i}`).style.height =
        (71 * volume) / 100 + 5 + 'px';
      document.querySelector(`#vol-r${i}`).style.height =
        (71 * volume) / 100 + 5 + 'px';
    }
  });
}

drawVolume();

/* countDown */
function startCountdown() {
  successElement.style.display = 'none';
  failedElement.style.display = 'none';
  volumeElement.style.display = 'none';
  countDownElement.style.display = 'flex';

  countDown3Element.style.display = 'block';
  countDown2Element.style.display = 'none';
  countDown1Element.style.display = 'none';

  setTimeout(() => {
    countDown3Element.style.display = 'none';
    countDown2Element.style.display = 'block';
    countDown1Element.style.display = 'none';
  }, 1000);
  setTimeout(() => {
    countDown3Element.style.display = 'none';
    countDown2Element.style.display = 'none';
    countDown1Element.style.display = 'block';
  }, 2000);
  setTimeout(() => {
    countDown3Element.style.display = 'none';
    countDown2Element.style.display = 'none';
    countDown1Element.style.display = 'none';
    volumeElement.style.display = 'flex';
    countDownElement.style.display = 'none';
    maxVolume = 0;
  }, 3000);
  setTimeout(() => {
    attempts += 1;
    if (
      (maxVolume > volumeThreshold && attempts > 1) ||
      attempts >= maxAttempts
    ) {
      volumeElement.style.display = 'none';
      successElement.style.display = 'flex';
      setTimeout(() => {
        location.assign(`../zoo-continue/index.html`);
      }, 1000);
    } else {
      volumeElement.style.display = 'none';
      failedElement.style.display = 'flex';
      setTimeout(startCountdown, 1000);
    }
  }, 6000);
}
