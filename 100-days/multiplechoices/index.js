window.addEventListener("load", () => {
  const sheet = document.getElementById("sheet");
  let buttons = [];
  // make the buttons fit the page as best as possible
  let width = Math.floor((document.body.offsetWidth - 200) / 21);
  let height = Math.floor((window.innerHeight) / 21);
  let total = width * height;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let radio = document.createElement("input");
      radio.type = "radio";
      // every time a button is clicked, choose between:
      // turning on a random button, or
      // hiding a lot of other buttons
      radio.onclick = (e) => {
        let r = Math.floor(Math.random() * 10);
        e.target.style.visibility = "hidden";
        switch (r % 2) {
          case 0:
            buttons[getRandomInt(0, total)].checked = "true";
            break;
          default:
            for (let n = 0; n < getRandomInt(1, total); n++) {
              buttons[getRandomInt(0, total)].style.visibility = "hidden";
            }
            break;
        }
        return false;
      }
      buttons.push(radio);
      sheet.appendChild(radio);
    }
  }
});

// from MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}