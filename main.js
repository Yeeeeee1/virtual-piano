let keys = document.querySelectorAll(".piano-key");
let letters = document.getElementsByClassName("btn-letters")[0];
let notes = document.getElementsByClassName("btn-notes")[0];
let fullscreenBtn = document.getElementsByClassName("fullscreen")[0];

let isToggling = false;

for (let i = 0; i < keys.length; i++) {
  keys[i].onmouseup = function () {
    keys[i].classList.remove("piano-key-active");
  };

  keys[i].onmouseout = function () {
    keys[i].classList.remove("piano-key-active");
  };

  keys[i].onmousedown = function (e) {
    isToggling = true;
    if (e.target !== window) {
      toggle(e);
    }
  };

  function toggle(e) {
    if (isToggling === false) {
      return;
    }
    let audio = new Audio();
    audio.src = `audio/${e.target.getAttribute("data-note")}.mp3`;
    audio.play();

    keys[i].classList.add("piano-key-active");
  }

  keys[i].onmouseenter = toggle;

  window.onmouseup = disableToggle;

  function disableToggle() {
    isToggling = false;
  }
}

document.onkeydown = function (e) {
  if (e.repeat) return;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].getAttribute("data-letter") == null) {
      continue;
    }
    if (e.key == keys[i].getAttribute("data-letter").toLowerCase()) {
      let audio = new Audio();
      audio.src = `audio/${keys[i].getAttribute("data-note")}.mp3`;
      audio.play();
      keys[i].classList.add("piano-key-active");
      setTimeout(() => {
        keys[i].classList.remove("piano-key-active");
      }, 250);
    }
  }
};

letters.onclick = function () {
  letters.classList.add("btn-active");
  notes.classList.remove("btn-active");
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.add("piano-key-letter");
  }
};

notes.onclick = function () {
  notes.classList.add("btn-active");
  letters.classList.remove("btn-active");
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.remove("piano-key-letter");
  }
};

fullscreenBtn.addEventListener(
  "click",
  function (e) {
    toggleFullScreen();
  },
  false
);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    fullscreenBtn.style.backgroundImage = "url(assets/fullscreen-exit.svg)";
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      fullscreenBtn.style.backgroundImage = "url(assets/fullscreen-open.svg)";
      document.exitFullscreen();
    }
  }
}
