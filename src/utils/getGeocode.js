const request = require('request');

const geocode = (address, callback) => {
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic25hcWVyb3UiLCJhIjoiY2s0bXcyaGF4MG1qZzNubmxmb3VlMDdzcSJ9.cw4iwjAl87Fw75gANfsIwA`;
  
  request({
    url: mapUrl,
    json: true,
  }, (error, { body }) => {
    if (error) {
      callback('Unable to return longitute and latitude', undefined);
    } else if (body.features.length === 0) {
      callback('No data for this name', undefined);
    } else {
      const [lng, lat] = body.features[0].center;
      callback(undefined, {
        lat,
        lng,
        location: body.features[0].place_name,
      });
    }
  })
};

module.exports = geocode;
