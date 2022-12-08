document.querySelector('.speech-button-ok').onclick = () => {
  const startCoordinates = '51.228229,4.405548';
  const coordinates = '51.231574,4.401851';
  const locationName = 'Waagnatie';
  const nextPage = 'waagnatie';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
};
