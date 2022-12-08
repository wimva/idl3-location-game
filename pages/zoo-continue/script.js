const AMOUNT_OF_SPEECH = 3;

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

document.querySelector('.speech-button-ok').onclick = () => {
  const startCoordinates = '51.217509,4.422590';
  const coordinates = '51.224205,4.412058';
  const locationName = 'De Prof';
  const nextPage = 'prof';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
};
