const request = require( 'postman-request' );

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = ( lat, long, callback ) => {
  const url = `http://api.weatherstack.com/current?access_key=baa58b60882e082884df514fae906a84&query=${ lat },${ long }`;

  request({ url, json: true }, ( error, { body } = {}) => {
    const data = body;
    if ( error ) {
      callback({ message: 'Unable to connect to weather service' }, undefined );
    } else if ( data.success === false ) {
      callback(
        {
          message: 'Unable to determine weather at that location',
        },
        undefined,
      );
    } else {
      const { current } = data;
      const tail = current.temperature !== current.feelslike ? ` but it feels like ${ current.feelslike }` : '.';
      const message = `${ current.weather_descriptions[0] }: It is currently ${ current.temperature } degrees${ tail }`;
      callback(
        undefined,
        {
          message,
        },
      );
    }
  });
};

module.exports = forecast;
