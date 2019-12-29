const hbs = require('hbs');
const path = require('path');
const express = require('express');

const getGeocode = require('./utils/getGeocode');
const getCoordinates = require('./utils/getCoordinates');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // default path is views folder
const partialsPath = path.join (__dirname, '../templates/partials');

// setup handlebars engine and view location
app.set('view engine', 'hbs'); // handle handlebars (hbs)
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
  response.render('index', {
    creatorName: 'PMa',
    title: 'Weather app',
    name: 'PM'
  })
})

app.get('/about', (request, response) => {
  response.render('about', {
    creatorName: 'PMa',
    title: 'About page'
  })
})

app.get('/help', (request, response) => {
  response.render('help', {
    creatorName: 'PMa',
    title: 'Help'
  })
})

app.get('/weather', (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: 'You have to provide address value',
    })
  }

getGeocode(request.query.address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return response.send({ error })
    }

    getCoordinates(lat, lng, (error, { summary, pressure }) => {
      if (error) {
        return response.send({ error })
      }

      response.send({
        forecast: summary,
        location,
        pressure,
      });
    })
  })
})

app.get('/help/*', (request, response) => {
  response.render('404', {
    title: '404',
    desc: 'Help article not found.',
    creatorName: 'PMa',
  })
})

app.get('*', (request, response) => {
  response.render('404', {
    title: '404',
    desc: 'Page was not found 404.',
    creatorName: 'PMa',
  })
})

app.listen(3000, () => {
  console.log('Listen on port 3000');
})
