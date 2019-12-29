const express = require('express');

const app = express();

app.get('', (request, response) => {
  response.send('Hello main page!');
})

app.get('/help', (request, response) => {
  response.send('Welcome on help page');
})

app.get('/about', (request, response) => {
  response.send('Welcome on about page');
})

app.get('/weather', (request, response) => {
  response.send('Weather page');
})

app.listen(3000, () => {
  console.log('Listen on port 3000');
})
