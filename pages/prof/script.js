$('#attachment').click(function() {
  $('#newMessage').fadeOut('slow', function(){
    $('.unlockButton').delay(2000).fadeIn('slow');
    $('#lock').delay(1500).fadeIn('slow');
  });
});


$('.unlockButton').click(function() {
  $('#locked').fadeOut('slow', function() {
    startCamera(false, '#video', '#canvas', '#capture', callback);
  });
});
  
function callback(base64) {
  console.log('the image was captured');
  console.log(base64);
}



//
const unlockButton = document.querySelector('#unlock-button');

unlockButton.onclick = () => {
  let secretCode = $(`#riddle`).val().toLowerCase();
  if(secretCode==="gate15") {
    $('#sound').fadeIn('slow');
  } else {
    alert("VERKEERD ANTWOORD! PROBEER OPNIEUW");
  }
};


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
