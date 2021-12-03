const startButton = document.querySelector('#start-button');

startButton.onclick = () => {
  const coordinates = '51.198479,4.484319'
  const locationName = 'Zoo';
  const nextPage = 'zoo';
  location.assign(`../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
}
