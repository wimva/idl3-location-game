const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const startCoordinates = '51.223530,4.411579';
  const coordinates = '51.226926,4.409760';
  const locationName = 'Gorillas';
  const nextPage = 'gorillas';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
};
