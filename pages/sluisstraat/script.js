const audioPlayer = document.getElementById('cargo');
  

const AMOUNT_OF_SPEECH = 3;

function setVisibleSpeech(index) {
  document.querySelectorAll('.speech').forEach((el) => {
    el.style.display = 'none';
  });
  //if(bananaFound>=bananaMax) {
    document.querySelector(`#speech-${index}`).style.display = 'block';
  //}
  
}


for (let index = 1; index <= AMOUNT_OF_SPEECH; index++) {
  const next = document.querySelector(`#speech-${index} .speech-button-next`);
  const prev = document.querySelector(`#speech-${index} .speech-button-prev`);

  if (next) {
    next.onclick = () => {
      setVisibleSpeech(index + 1);
      if(index>=2) {
        audioPlayer.play();
        $('#fin').delay(5500).fadeIn(4000);
        localStorage.clear();
      }
    };
  }

  if (prev) {
    prev.onclick = () => {
      setVisibleSpeech(index - 1);
    };
  }
}