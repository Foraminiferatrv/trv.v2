$( document ).ready( function () {
  var slides = document.querySelectorAll( '.slide' );
  console.log( {
    slides: slides
  } );
  $( '.slider' ).slick( {
    arrows: true,
    autoplay: true,
    autoplaySpeed: 8000,
    fade: true,
    pauseOnHover: true,
  } );
  var div = document.querySelector( '.news' );
  var news = content[ 0 ];
  var pFirst = document.createElement( 'p' );
  pFirst.innerText = news;
  div.append( pFirst );


} );

$.getJSON( '../assets/data/card-data.json', ( userData ) => {
  userData.forEach( user => {
    addCard( user );
  } )
  console.log( userData );

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
  newsSelector.append( pNews );
  setTimeout( function () {
    currentNews.parentNode.removeChild( currentNews );
  }, 200 );

} );
// --------------




function userCard( user ) {
  return `
  <div class="card row">
  <div class="avatar-block col-4">
      <img src="${user.avatarUrl}" alt="user-avatar" class="avatar">
  </div>

  <div class="stats-block col-8">
      <div class="stat">
          <div class="label ">
              <p class="label-text">strat</p>
          </div>
          <div class="progress-bar ">
              <div class="progress" style="width:${user.stats[0]}%;"></div>
          </div>
      </div>
      <div class="stat">
          <div class="label">
              <p class="label-text">react</p>
          </div>
          <div class="progress-bar">
              <div class="progress" style="width:${user.stats[1]}%;"></div>
          </div>
      </div>
      <div class="stat">
          <div class="label">
              <p class="label-text m-0">exp</p>
          </div>
          <div class="progress-bar">
              <div class="progress" style="width:${user.stats[2]}%;"></div>
          </div>
      </div>
  </div>
  <div class="info-block col-4 mb-0">
      <p class="info">${user.name}</p>
      <a href="${user.steamLink}" class="link info">steam</a>
      <p class="info">${user.role}</p>
  </div>

  <div class="col-8 mb-0">
    <div class="links-block"> 
        ${user.links.map(icon=>getCardLink(icon)).join(' ')}
    </div>
  </div>
  </div>`;
}

function addCard( user ) {
  const cards = document.getElementById( 'cards' );
  const card = document.createElement( 'div' );
  card.classList.add( 'col-12', 'col-md-6', 'mb-3' );
  card.innerHTML = userCard( user );
  cards.append( card );
}

function getImage( name ) {
  switch ( name ) {
    case 'cs':
      return '../assets/content/icons/csgo-icon-6.png';
    case 'dota':
      return '../assets/content/icons/dota.png';
    case 'battlenet':
      return '../assets/content/icons/battle.png';
    case 'pubg':
      return '../assets/content/icons/pubg_1337277.png';
    default:
      return null;
  }
}

function getCardLink(icon){
  return `<a href="${icon.link}" class="link"><img src="${getImage(icon.name)}" alt=""></a>`;
}