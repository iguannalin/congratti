window.addEventListener("load", () => {
  let w = window.innerWidth - 100;
  let h = window.innerHeight - 100;
  let timeout;
  let isDown = false;

  let debounce = function(func, delay) {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };

  function onType(e) {
    if (!e.target.value) document.body.innerHTML = "";
    debounce(() => {
      let elem;
      for (let i = 0; i < w; i+=12) {
        elem = document.createElement('p');
        elem.innerText = e.target.value;
        elem.style.top = `${i}px`;
        elem.style.left = `${e.target.value.length * 5 * i}px`;
        document.body.appendChild(elem);
      }
      setInterval(() => {
          window.scrollTo({
            top: isDown ? document.body.scrollHeight : 0,
            left: 0,
            behavior: "smooth",
          });
          isDown = !isDown;
        }, 560
      );
    }, 200);
  }
  
  let input = document.getElementById("prompt");
  input.oninput = onType;
});