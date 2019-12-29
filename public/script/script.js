const inputValue = document.querySelector('#input');
const form = document.querySelector('#form');
const weatherInfo = document.querySelector('#weatherInfo');
const weatherInfo2 = document.querySelector('#weatherInfo2');
const weatherInfo3 = document.querySelector('#weatherInfo3');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  weatherInfo.textContent = 'loading..';
  weatherInfo2.textContent = '';
  weatherInfo3.textContent = '';

  if (inputValue.value) {
    fetch(`/weather?address=${inputValue.value}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (json.error) {
          weatherInfo.textContent = json.error;
          weatherInfo2.textContent = '';
          weatherInfo3.textContent = '';
        } else {
          weatherInfo.textContent = json.forecast;
          weatherInfo2.textContent = json.location;
          weatherInfo3.textContent = json.pressure;
        }
      })
      .catch((err) => {
        weatherInfo.textContent = err;
        weatherInfo2.textContent = '';
        weatherInfo3.textContent = '';
      })
  }
})
