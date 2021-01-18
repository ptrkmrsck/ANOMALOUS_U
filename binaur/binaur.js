let slider,
  db1,
  startStop,
  freqBoxs,
  panL,
  panR,
  count = 0,
  btn,
  testimony;

let tonez = [
  [379.9, 380.1, 440.1, 439.9],
  [320.2, 320.5, 319.5, 319.7],
  [331, 330, 341, 321],
  [286, 346, 220, 284],
  [102, 402, 202, 302],
  [272, 352, 526, 450],
  [280, 271.1, 217, 218.7],
  [520, 95, 260, 130],
];

let placeholder = [
  "plchld1",
  "plchld2",
  "plchld3",
  "plchld4",
  "plchld5",
  "plchld6",
  "plchld7",
  "plchld8",
];

const oscillators = [];
const freqs = [286, 346, 220, 284];
const bassFreq = 100;

window.onload = () => {
  setup();
};

function setup() {
  slider = document.querySelector("#volume");
  startStop = document.querySelector("#start-stop");
  freqBoxs = document.querySelectorAll(".freq");
  btn = document.querySelector(".cycle");
  testimony = document.querySelector("#testimony");

  //set up pan's
  panL = new Tone.Panner({
    pan: -1,
  }).toDestination();
  panR = new Tone.Panner({
    pan: 1,
  }).toDestination();

  //setup oscillators
  for (let i = 0; i < 4; i++) {
    oscillators.push(
      new Tone.Oscillator({
        frequency: tonez[2][i],
        type: "sine",
        volume: -Infinity,
        // detune: Math.random() * 30 - 15,
      }).connect(i < 2 ? panL : panR)
    );
  }

  //start and stop oscillators via toggle checkbox
  startStop.addEventListener("change", () => {
    if (!startStop.checked) {
      oscillators.forEach((o) => {
        o.stop("+1.2");
        o.volume.rampTo(-Infinity, 0.5);
      });
      return;
    }
    oscillators.forEach((o) => {
      o.start();
      o.volume.rampTo(-10, 0.5);
    });
  });

  //connect slider to master volume
  slider.addEventListener("input", (e) => {
    Tone.Master.volume.rampTo(slider.value, 0.1);
  });

  // cycle through tonez
  btn.addEventListener("click", () => {
    testimony.value = "";
    let modcount = count % tonez.length;
    testimony.placeholder = placeholder[modcount];
    oscillators.forEach((osc, i) => {
      osc.frequency.rampTo(tonez[modcount][i], 1);
    });
    console.log(tonez[modcount]);
    count++;
  });
}
