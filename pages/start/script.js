const startButton = document.querySelector('#start-button');

startButton.onclick = () => {
  const coordinates = '51.217509,4.422590';
  const locationName = 'Zoo';
  const nextPage = 'zoo';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`,
  );
};
