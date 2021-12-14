const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const coordinates = '51.226926,4.409760';
  const locationName = 'Gorillas';
  const nextPage = 'gorillas';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`,
  );
};
