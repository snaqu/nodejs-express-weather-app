const request = require('request');

const coordinates = (lat, lng, callback) => {
  // to add keys (at the end of url) -> ?key=values&otherKey=otherValues
  const forecastUrl = `https://api.darksky.net/forecast/29034a87fe72c48516e153572bb79e6c/${lat},${lng}`;
  
  request({ 
    url: forecastUrl,
    json: true,
  }, (error, { body }) => {
    if (error) {
      callback('Unable to return weather forecast', undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, body.currently);
    }
  })
}

module.exports = coordinates;
