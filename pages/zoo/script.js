const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const coordinates = '51.223530,4.411579'
  const locationName = 'De Prof';
  const nextPage = 'prof';
  location.assign(`../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
}
