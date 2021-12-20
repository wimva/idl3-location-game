const AMOUNT_OF_SPEECH = 10;

function setVisibleSpeech(index) {
  document.querySelectorAll('.speech').forEach((el) => {
    el.style.display = 'none';
  });
  document.querySelector(`#speech-${index}`).style.display = 'block';
}

for (let index = 1; index <= AMOUNT_OF_SPEECH; index++) {
  const next = document.querySelector(`#speech-${index} .speech-button-next`);
  const prev = document.querySelector(`#speech-${index} .speech-button-prev`);

  if (next) {
    next.onclick = () => {
      setVisibleSpeech(index + 1);
    };
  }

  if (prev) {
    prev.onclick = () => {
      setVisibleSpeech(index - 1);
    };
  }
  
}


//
const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const startCoordinates = '51.224358,4.412083';
  const coordinates = '51.226926,4.409760';
  const locationName = 'Gorillas';
  const nextPage = 'gorillas';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
};



