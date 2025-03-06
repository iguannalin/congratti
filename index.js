window.addEventListener( "load", () => {
  function getRandomInt( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * (max - min) + min ); // The maximum is exclusive and the// minimum is inclusive
  }

  const floorContainer = document.querySelector( ".flex-floor" );

  const pictureFolders = [ { name: "projects", count: 11 }, { name:"yosemite", count: 7 }, { name:"reveries", count: 9}, { name:"eastcoast", count: 16}, { name:"alaska", count: 7}, { name:"exposure", count: 21}];
  function loadPictures() {
    const directory = pictureFolders[getRandomInt(0,pictureFolders.length)];
    for (let i = 0; i < directory.count; i++)
      fetch(`public/${directory.name}/${i}.png`).then(r => r.blob()).then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        floorContainer.appendChild(imageElement);
    })
  }
  loadPictures();

  const dotsContainer = document.getElementById( "dots-container" );

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
  document.body.addEventListener( "touchmove", ( e ) => drawDots( e, true ) );
} );