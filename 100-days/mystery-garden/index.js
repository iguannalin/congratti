window.addEventListener("load", () => {
  const parent = document.getElementById("parent");
  let flowers = ["🌹","🥀","🌺","🪻","🌻","🌼","🌷","🌱","🪴","🌲","🌳","🌴","🌵","🌾","🌿","☘️","🍀", "🐸"];
  let count = 0;

  for (let i = 1; i < 10; i++) {
    let button = document.createElement("button");
    button.innerText = "🕳"
    button.onclick = buttonClicked;
    parent.appendChild(button);
  }
  function buttonClicked(e) {
    e.target.innerText = flowers[Math.floor(Math.random()*flowers.length)];
    e.target.onclick = {};
    count++;
    if (count >= 9) document.getElementById('text').innerText = "🌞"
  }
});