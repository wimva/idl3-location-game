const AMOUNT_OF_SPEECH = 5;

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
  location.assign(`../zoo-game/index.html`);
};
