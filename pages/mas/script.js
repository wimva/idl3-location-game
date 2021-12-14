const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const startCoordinates = '51.228229,4.405548';
  const coordinates = '51.231580,4.401655';
  const locationName = 'Waagnatie';
  const nextPage = 'waagnatie';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
};
