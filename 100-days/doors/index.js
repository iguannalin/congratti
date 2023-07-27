window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let verbs = [];
  const shape = [5,10,15,18,20,23,23,23,24,25,28,25,25,25,25,20,25,25,25,25,25,25,25,25,25,25,25,25];
  const constant = "  room to  ";
  let div = document.getElementById('container');

  function onClickDoor() {
    if (verbs.length < 1) verbs = ["be crazy", "cry", "panic", "sigh", "care", "scream", "be wild", "dream", "be lost", "be mad", "be silly", "be glad", "rest", "stare", "not know", "dare"];
    div.innerHTML = "";
    drawDoor();
  }

  function drawDoor() {
    let door = document.createElement("div");
    door.classList = "door";
    let verb = verbs.splice(getRandomInt(0,verbs.length), 1);
    let p = 1;
    shape.forEach((len, lindex) => {
      door.innerHTML += "*"//len;
      let c = 0;
      for (let i = 0; i < len; i++) {
        if (lindex == 10 && i > 8 && i < 20) {
          door.innerHTML += constant[c];
          c++;
        }
        else if (lindex == 15 && i > Math.floor((len/2) - (verb.length/2))-p && i < Math.round((len/2) + verb.length/2) + p) {
          door.innerHTML += verb[c] ? verb[c] : Math.random()<.5&&"\u29F8"||"\u29F9";
          c++;
        }
        else {
          if (lindex == 15 && i == 0) c = -p;
          door.innerHTML += Math.random()<.5&&"\u29F8"||"\u29F9";
        }
      }
      door.innerHTML += "<br>";
    });
    door.addEventListener("click", onClickDoor);
    div.appendChild(door);
  }

  onClickDoor();
});