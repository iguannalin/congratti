window.addEventListener( "load", () => {
  function getRandomInt( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * (max - min) + min ); // The maximum is exclusive and the
                                                            // minimum is inclusive
  }

  const dotsContainer = document.getElementById( "dots-container" );
  const container = document.getElementById( "container" );

  let dotIndex = 0;
  const dotMax = 500;

  function drawDots( e, isTouch = false ) {
    const dots = Array.from( document.getElementsByTagName( "dot" ) );
    let dot;
    if ( dots.length < dotMax ) {
      dot = document.createElement( "dot" );
      dot.innerText = '.';
      dotsContainer.appendChild( dot );
    } else {
      dot = dots[dotIndex];
      dotIndex++;
    }

    if ( dotIndex >= dotMax ) dotIndex = 0;

    if ( isTouch ) {
      e.preventDefault();
      document.body.style.overflow = "hidden";
      dot.style.left = `${ e.targetTouches[0].pageX }px`;
      dot.style.top = `${ e.targetTouches[0].pageY }px`;
    } else {
      dot.style.left = `${ e.x - 10 }px`;
      dot.style.top = `${ e.y - 12 }px`;
    }
    dotsContainer.appendChild( dot );
  }

  document.body.addEventListener( "mousemove", ( e ) => drawDots( e ) );
  document.body.addEventListener( "touchmove", ( e ) => drawDots( e ) );
} );