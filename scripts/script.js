$( document ).ready( function () {
  var slides = document.querySelectorAll( '.slide' );
  console.log( {
    slides: slides
  } );
  $( '.slider' ).slick( {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 8000,
    fade: true,
    pauseOnHover: true
  } );
  var div = document.querySelector( '.news' );
  var news = content[ 0 ];
  var pFirst = document.createElement( 'p' );
  pFirst.innerText = news;
  div.append( pFirst );

} );

var content = [
  'Ahoy! We have come into the Hearthstone!',
  'Our super succesful team in Dota 2...',
  'Find us in CS:GO!',
  'You can become a part of our divinity',
  'Some of us are playing even in PUBG... You may join!'
];


$( '.slider' ).on( 'afterChange', function ( event ) {
  var slides = document.querySelectorAll( '.slide' );
  slides = Array.from( slides ).filter( function ( slide ) {
    return !slide.classList.contains( "slick-cloned" );
  } );

  var current = Array.from( slides ).find( slide => slide.classList.contains( 'slick-current' ) );
  const index = Array.from( slides ).indexOf( current );
  const newsContent = content[ index ];
  var pNews = document.createElement( 'p' );
  pNews.innerText = newsContent;
  pNews.classList.add( 'news-appear' );
  var newsSelector = document.querySelector( '.news' );
  var currentNews = newsSelector.querySelector( 'p' );  
  currentNews.classList.add( 'news-disapear' );
  console.log('TATA');
  newsSelector.append( pNews );
  setTimeout( function () {
    currentNews.parentNode.removeChild( currentNews );
  }, 200 );

} );
// --------------
