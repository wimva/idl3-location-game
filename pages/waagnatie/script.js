const AMOUNT_OF_SPEECH = 7;

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

document.querySelector(`#ok-button`).onclick = () => {
    let secretCode = $(`#riddle`).val().toLowerCase();
    if(secretCode==="3a9g") {
        setVisibleSpeech(6);
    } else {
        alert("VERKEERDE CODE!\nProbeer opnieuw");
    }
};

document.querySelector('.continue-button').onclick = () => {
    const coordinates = '51.23570256063406,4.405535306808561';
    const locationName = 'Sluisstraat';
    const nextPage = 'sluisstraat';
    location.assign(
      `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`,
    );
  };
