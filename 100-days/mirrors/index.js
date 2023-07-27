const subjects = ["she", "he", "it", "they", "they", "i", "you"];
const objects = ["her", "him", "it", "them", "them", "me", "you"];

window.addEventListener("load", () => {
  let subject = subjects; // copy of array for manipulating
  let object = objects;
  let clicked = 0;
  let first = subject[Math.floor(Math.random() * subject.length)]; // initialize first randomly
  let second = 0;
  let x = 0;
  let y = 0;
  const spacing = window.innerHeight / 15;
  function showLine() {
    clicked++;
    let r = Math.floor(Math.random() * subject.length);

    second = object[r];
    object = objects.filter((o) => o != second);

    if (clicked % 2 == 1) { // alternate display text between left and right
      x = "left";
      y += spacing;
    } else {
      x = "right";
      y += spacing;
    }

    let kid = document.createElement("p");
    kid.innerText = `${first} ${(first == "they" || first == "me" || first == "you") ? "were" : "was"} looking at ${second}`;
    kid.style.textAlign = x;
    kid.style.top = `${y}px`;
    document.body.appendChild(kid);
    kid.scrollIntoView();

    first = subject[r];
    subject = subjects.filter((s) => s != first);

    if (subject.length < 1) subject = subjects;
    if (object.length < 1) object = objects;
  }
  
  showLine();
  document.addEventListener("click", () => {
    showLine();
  });
});