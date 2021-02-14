let toggle = true;
const player1 = new Tone.Player({
  url: "./voice1.mp3",
  loop: true,
  playbackRate: 0.5,
});

const player2 = new Tone.Player({
  url: "./voice2.mp3",
  loop: true,
  playbackRate: 0.5,
});

const panL = new Tone.Panner({
  pan: -1,
});
const panR = new Tone.Panner({
  pan: 1,
});

player1.connect(panL);
player2.connect(panR);

panR.toDestination();
panL.toDestination();

function startStuff() {
  console.log("startin");
  toggle ? player1.start() : player1.stop();
  toggle ? player2.start() : player2.stop();

  toggle = !toggle;
}

window.addEventListener("click", startStuff);
