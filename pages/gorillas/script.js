const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const coordinates = '51.228229,4.405548'
  const locationName = 'Mas';
  const nextPage = 'mas';
  location.assign(`../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
}