window.addEventListener("load", () => {
  const w = window.innerWidth - 350;
  const h = window.innerHeight - 200;
  const people = ["🕴️ Person in Suit Levitating", "🤺 Person Fencing", "🏇 Horse Racing", "⛷️ Skier", "🏂 Snowboarder", "🏌️ Person Golfing", "🏌️‍♂️ Man Golfing", "🏌️‍♀️ Woman Golfing", "🏄 Person Surfing", "🏄‍♂️ Man Surfing", "🏄‍♀️ Woman Surfing", "🚣 Person Rowing Boat", "💃 Woman Dancing", "🚣‍♂️ Man Rowing Boat", "🚣‍♀️ Woman Rowing Boat", "⛹️ Person Bouncing Ball", "⛹️‍♂️ Man Bouncing Ball", "⛹️‍♀️ Woman Bouncing Ball", "🏋️ Person Lifting Weights", "🏋️‍♂️ Man Lifting Weights", "🏋️‍♀️ Woman Lifting Weights", "🚴 Person Biking", "🚴‍♂️ Man Biking", "🚴‍♀️ Woman Biking", "🤸 Person Cartwheeling", "🤸‍♂️ Man Cartwheeling", "🤸‍♀️ Woman Cartwheeling", "🤼 People Wrestling", "🤼‍♂️ Men Wrestling", "🤼‍♀️ Women Wrestling", "🤾 Person Playing Handball", "🤾‍♂️ Man Playing Handball", "🤾‍♀️ Woman Playing Handball"];
  
  let top;
  let left;
  let personLeft;
  let speed = 5;
  
  const person = document.getElementById('person');
  const hole  =document.getElementById('hole');
  const header  =document.getElementById('header');
  
  function reset() {
    console.log(speed);
    if (speed > 20) speed = 5;
    top = getRandomInt(h);
    left = getRandomInt(w);
    personLeft = left+400;
    person.innerText = people[getRandomInt(people.length)].split(" ")[0];
    person.style.top = `${top}px`;
    setInterval(() => {
      person.style.left = `${personLeft-=speed}px`;
      if (personLeft <= (left + 60)) {
        speed += 1;
        reset();
      } else {
        header.innerText = "Stop them!";
      }
    }, 100);
    hole.innerText = "🕳️";
    hole.style.top = `${top}px`;
    hole.style.left = `${left}px`;
  }
  
  hole.onclick = reset;
  reset();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}