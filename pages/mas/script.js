 mySettings = {
  rows: 3,
  cols: 3,
  shuffle: true, 
  numbers: false, 
  control: { 
      shufflePieces: false, 
      toggleNumbers: false, 
      toggleOriginal: false, 
      counter: false, 
      timer: false 
  }, 
success: {
      callback: function(results) { 
          //alert('Gelöst in ' + results.moves + ' Zügen und ' + results.seconds + ' Sekunden.');
          $('#losetoep').fadeOut('fast');
          //$('#losetoep').fadeOut('fast');
          setTimeout( () => {goWaagnatie(), 1500});
      }
  }
};

function callback(base64) {
  //console.log('the image was captured');
  //console.log(base64);
  base64 = base64.replace(/(\r\n|\n|\r)/gm, "");	        
  $("#shuffledImage").attr('src', base64);
  $("#shuffledImage").width("100%");
  $("#shuffledImage").height("auto");
  setTimeout( () => {shuffleMe(), 500});
  $('#puzzle').fadeIn('fast');
}
function shuffleMe() {
  $('#shuffledImage').jqPuzzle(mySettings);
  $('#losetoep').fadeIn('fast');
  $('#puzzle').fadeIn('fast');
}

const gotoCamera = document.querySelector('#gotoCamera');
gotoCamera.onclick = () => {
  $('#kodak').fadeIn('fast');
  startCamera(false, '#video', '#canvas', '#capture', callback);
};

function goWaagnatie() {
  const startCoordinates = '51.228229,4.405548';
  const coordinates = '51.231574,4.401851';
  const locationName = 'Waagnatie';
  const nextPage = 'waagnatie';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
}