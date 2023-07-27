window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const shape = [5,10,15,18,20,23,23,23,24,25,25,25,25,25,25,23,25,25,25,25,25,25,25,25,25,25,25,25];

  let div = document.getElementById('container');
  let door;
  let yRotation;
  let doorAnimation;
  let forbidden = ["it","for","neither","nor","and","only","whether","but","or","such","that","yet","so","also","provided","whoever","yet","while","still","until","too","unless","since","however","which","otherwise","where","who","than","the","after","as","because","either","whoever","nevertheless","though","else","although","if","in","while","till","sooner"];
  let word;

  function openDoor() {
    door.style.transform = `rotateY(${yRotation+=1}deg)`;
    word.style.opacity = 1;
    if (yRotation >= 88) clearInterval(doorAnimation);
  }

  function onClickDoor() {
    doorAnimation = setInterval(openDoor, 25);
  }

  function drawDoor() {
    door = document.createElement("div");
    door.classList = "door";
    shape.forEach((len, lindex) => {
      door.innerHTML += "*";
      let c = 0;
      for (let i = 0; i < len; i++) {
        if (lindex == 15 && i == 20) door.innerHTML += " ◯ ";
        else door.innerHTML += Math.random()<.5&&"\u29F8"||"\u29F9";
      }
      door.innerHTML += "<br>";
    });
    yRotation = 0;
    door.addEventListener("click", onClickDoor);
    div.appendChild(door);
  }

  function findWord(text) {
    let w = text[getRandomInt(0, text.length)].toLowerCase().trim();
    if (forbidden.includes(w)) return findWord(text);
    else return w;
  }
  
  // text taken from Project Gutenberg Australia: http://gutenberg.net.au/ebooks02/0201091h.html
  fetch("https://annaylin.com/100-days/connect-the-dots/waves.txt").then((file) => file.text()).then((d) => {
    const text = d.split(" ");
    word = document.createElement("div");
    word.classList = "word";
    let x = findWord(text);
    word.innerHTML = x;
    word.style.opacity = 0;
    div.appendChild(word);
  });

  drawDoor();
});