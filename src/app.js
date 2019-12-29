const path = require('path');
const express = require('express');

const app = express();
// pliki z folderu public są serwwane i dostpne przez routy z ich nazwą
// np. localhost:3000/help.html
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (request, response) => {
  // Mogę wysłać obiekt, tablice i zrobi się z tego json
  // Mogę wysłac kod html
  // response.send({
  //   name: 'test',
  //   age: 23,
  // });
  response.send('Weather page');
})

app.listen(3000, () => {
  console.log('Listen on port 3000');
})
