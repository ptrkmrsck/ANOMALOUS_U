let toneArr,
  toneTimer,
  tones,
  oldNum,
  theText,
  dur = 10000;

window.onLoad = setup();

let clickOrTouchEvent = "ontouchstart" in window ? "touchstart" : "click";

window.addEventListener(clickOrTouchEvent, playPause);

function setup() {
  tones = document.getElementById("tones");
  theText = document.querySelector(".clickAnywhere");
  toneArr = [
    1, 61, 121, 181, 241, 301, 361, 421, 481, 541, 601, 661, 721, 781, 841,
  ];
  randomTone();
}

function randomTone() {
  let rdm = Math.floor(Math.random() * 15);
  dur = Math.floor(Math.random() * 30000) + 25000;
  console.log(dur);
  if (rdm == oldNum) {
    randomTone();
  } else {
    tones.currentTime = toneArr[rdm];
  }
  oldNum = rdm;
  toneTimer = setTimeout(randomTone, dur);
}

function playPause() {
  return tones.paused ? play() : pause();
}

function play() {
  tones.play();
  theText.style.visibility = "hidden";
}
function pause() {
  tones.pause();
  theText.style.visibility = "visible";
}
