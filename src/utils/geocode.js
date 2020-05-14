const request = require( 'postman-request' );

const geocode = ( address, callback ) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent( address ) }.json?access_token=pk.eyJ1Ijoia2lsdGVkZGV2IiwiYSI6ImNrYTJuaHB4ODAwcjUzZnM1NG14dmx6NnkifQ.LD5uoxoUfDu-LtEzjxYS1Q&limit=1`;

  request({ url, json: true }, ( error, { body } = {}) => {
    if ( error ) {
      callback(
        {
          message: 'Unable to connect to location services',
        },
        undefined,
      );
    } else if ( body.features.length === 0 ) {
      callback(
        {
          message: 'Unable to find location.  Try another search.',
        },
        undefined,
      );
    } else {
      const feature = body.features[0];
      const location = feature.place_name;
      const lat = feature.center[1];
      const long = feature.center[0];
      callback(
        undefined,
        {
          location,
          lat,
          long,
        },
      );
    }
  });
};

module.exports = geocode;
