const audioVolumeArray = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
let now = new Date().getTime();

function microphoneSuccess(volume) {
  const newNow = new Date().getTime();
  if (newNow > now + 20) {
    now = newNow;
    audioVolumeArray.unshift(Math.round(volume));
    audioVolumeArray.pop();

    drawVolume();
  }
}

getMicrophone(microphoneSuccess);

function drawVolume() {
  audioVolumeArray.forEach((volume, i) => {
    if (i === 0) {
      document.querySelector(`#vol-0`).style.transform = `scale(1, ${
        volume / 100
      })`;
    } else {
      document.querySelector(`#vol-l${i}`).style.transform = `scale(1, ${
        volume / 100
      })`;
      document.querySelector(`#vol-r${i}`).style.transform = `scale(1, ${
        volume / 100
      })`;
    }
  });
}

drawVolume();

const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const startCoordinates = '51.217509,4.422590';
  const coordinates = '51.224358,4.412083';
  const locationName = 'De Prof';
  const nextPage = 'prof';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
};
