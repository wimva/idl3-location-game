const countdown1 = document.querySelector('#countdown-1');
const countdown2 = document.querySelector('#countdown-2');
const countdown3 = document.querySelector('#countdown-3');
const countdownGo = document.querySelector('#countdown-go');

countdownGo.style.display = 'none';
countdown1.style.display = 'none';
countdown2.style.display = 'none';
countdown3.style.display = 'block';
setTimeout(() => {
  countdownGo.style.display = 'none';
  countdown1.style.display = 'none';
  countdown2.style.display = 'block';
  countdown3.style.display = 'none';
}, 1000);
setTimeout(() => {
  countdownGo.style.display = 'none';
  countdown1.style.display = 'block';
  countdown2.style.display = 'none';
  countdown3.style.display = 'none';
}, 2000);
setTimeout(() => {
  countdownGo.style.display = 'block';
  countdown1.style.display = 'none';
  countdown2.style.display = 'none';
  countdown3.style.display = 'none';
}, 3000);
setTimeout(() => {
  const startCoordinates = '51.226926,4.409760';
  const coordinates = '51.228229,4.405548';
  const locationName = 'Mas';
  const nextPage = 'mas';
  location.assign(
    `../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}&startCoordinates=${startCoordinates}`,
  );
}, 4000);
