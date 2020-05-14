console.log( 'client side js is loaded' );

const weatherForm = document.querySelector( '#location-search-form' );
const searchBox = document.querySelector( '#location-search-input' );
const messageOne = document.querySelector( '#search-message-1' );
const messageTwo = document.querySelector( '#search-message-2' );

messageOne.textContent = '';

weatherForm.addEventListener( 'submit', ( e ) => {
  e.preventDefault();
  messageOne.classList.remove( 'error-message' );
  messageOne.textContent = 'Loading...';
  const location = searchBox.value;

  fetch( `/weather?location=${ location }` ).then(( response ) => {
    response.json().then(( data ) => {
      if ( data.error ) {
        messageOne.classList.add( 'error-message' );
        messageOne.textContent = data.error.message;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.message;
      }
      return data;
    });
  });
});
