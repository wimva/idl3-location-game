const audioVolumeArray = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
let now = new Date().getTime();

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then(function(stream) {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  microphone = audioContext.createMediaStreamSource(stream);
  javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
  javascriptNode.onaudioprocess = function() {
    let array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    let values = 0;

    let length = array.length;
    for (let i = 0; i < length; i++) {
      values += (array[i]);
    }

    var average = values / length;
    const newNow = new Date().getTime();
    if (newNow > now + 20) {
      now = newNow;
      audioVolumeArray.unshift(Math.round(average));
      audioVolumeArray.pop();

      drawVolume();
    }
  }
  })
  .catch(function(err) {
    /* handle the error */
});

function drawVolume() {
  audioVolumeArray.forEach((volume, i) => {
    if (i === 0) {
      document.querySelector(`#vol-0`).style.transform = `scale(1, ${volume/100})`;
    } else {
      document.querySelector(`#vol-l${i}`).style.transform = `scale(1, ${volume/100})`;
      document.querySelector(`#vol-r${i}`).style.transform = `scale(1, ${volume/100})`;
    }
  });
}

drawVolume();

const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const coordinates = '51.223530,4.411579'
  const locationName = 'De Prof';
  const nextPage = 'prof';
  location.assign(`../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
}
