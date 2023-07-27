window.addEventListener("load", () => {
  let wOffset = window.innerWidth/6;
  let hOffset = window.innerHeight/6;
  let w = window.innerWidth - (wOffset);
  let h = window.innerHeight - hOffset;
  const parent = document.getElementById("parent");
  const heading = document.getElementById("heading");
  let button = document.createElement("button");
  button.innerText = "🐹"
  
  reposition(button);
  parent.appendChild(button);
  
  button.onclick = () => {
    const hole = document.createElement("p");
    hole.innerText = "🕳";
    hole.style.top = button.style.top;
    hole.style.left = button.style.left;
    heading.innerHTML = `<h1>:)</h1>`;
    button.style.display = "none";
    parent.appendChild(hole);
    setTimeout(() => {reposition(button)}, 700);
  };

  function reposition(elem) {
    heading.innerHTML = `<h1>:(</h1>`;
    elem.style.display = "block";
    elem.style.left = `${Math.max(getRandomInt(w),wOffset)}px`;
    elem.style.top = `${Math.max(getRandomInt(h),hOffset)}px`;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
});