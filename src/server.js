const path = require( 'path' );
const express = require( 'express' );
const hbs = require( 'hbs' );

const geocode = require( './utils/geocode' );
const forecast = require( './utils/forecast' );

const app = express();

// define paths for express config
const publicDirectoryPath = path.join( __dirname, '../public' );
const viewsPath = path.join( __dirname, '../templates/views' );
const partialsPath = path.join( __dirname, '../templates/partials' );

// setup handlebars engine and views location
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsPath );
hbs.registerPartials( partialsPath );

// setup static directory to serve
app.use( express.static( publicDirectoryPath ));

app.get( '', ( req, res ) => {
  res.render( 'index', {
    title: 'Weather App',
    name: 'Thomas Wilson',
  });
});

app.get( '/about', ( req, res ) => {
  res.render( 'about', {
    title: 'About me',
    name: 'Thomas Wilson',
  });
});

app.get( '/help', ( req, res ) => {
  res.render( 'help', {
    title: 'Help',
    name: 'Thomas Wilson',
    message: 'We are happy to help solve your problem',
  });
});

app.get( '/weather', ( req, res ) => {
  if ( !req.query.location ) {
    return res.send({
      error: {
        message: 'You must provide a location.',
      },
    });
  }

  geocode( req.query.location, ( error, { lat, long, location } = {}) => {
    if ( error ) {
      return res.send({ error });
    }
    forecast( lat, long, ( error, { message }) => {
      if ( error ) {
        res.send({ error });
      }
      return res.send({
        location,
        message,
      });
    });
  });
});

app.get( '/products', ( req, res ) => {
  console.log( req.query.search );
  res.send({
    products: [],
  });
});

app.get( '/help/*', ( req, res ) => {
  res.render( '404', {
    name: 'Thomas Wilson',
    title: 'Error',
    message: 'Help Article Not Found',
  });
});

app.get( '*', ( req, res ) => {
  res.render( '404', {
    name: 'Thomas Wilson',
    title: 'Error',
    message: 'Page Not Found',
  });
});

app.listen( 3000, () => {
  console.log( 'Server is up on port 3000' );
});
