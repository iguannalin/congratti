// TYPEWRITER VARIABLES, Inspired by Josh Collinsworth https://bit.ly/2MaA5CQ
var n = 0;
var textToType = {
  me: "I am a",
  myThings: [" designer.", " programmer."]
};
var target = document.getElementById('blurb');
var interval = 0;
var textIndex = 0;

function typewrite( blurb, target ) {


  if ( typeof( blurb[n] !== 'undefined' ) ) {

    target.textContent += blurb[n];

  }

  if ( blurb[n] == '.' ) {

    setTimeout( function() { backspace(); }, 550 );
  
  }

  interval = Math.floor((Math.random() * 300) + 5);

  n++;

  if ( n < blurb.length ) {

    setTimeout( function() { 

      typewrite( blurb, target );

    }, interval );

  }

}

function backspace() {

  interval = Math.floor((Math.random() * 200) + 5);
  var t = document.getElementById('blurb');

  if ( t.textContent !== textToType.me ) {

    setTimeout( function() {

        t.textContent = t.textContent.toString().slice( 0, -1 );
        backspace();

      }, interval );

  }

  else {

    n = 0;
    textIndex = ( textIndex + 1 ) % textToType.myThings.length;
    typewrite( textToType.myThings[textIndex], target );

  }

}

if ( target ) backspace();