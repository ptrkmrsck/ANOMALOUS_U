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
  [348.83, 490.55, 523.25, 327.03],
  [220, 410, 222, 210],
  [80, 120, 81, 101],
  [89, 233, 144, 377],
  [261.63, 327.03, 294.33, 348.83],
  [100, 300, 200, 350],
  [220, 90, 222, 108],
];

let placeholder = [
  "Listen. Take as much time as feels right. Respond:",
  "Report your experience here:",
  "Is anything changing?",
  "Is this sound inside or outside of you?",
  "Have you heard this sound before?",
  "Listening takes time. Perception only exists in time. Please respond:",
  "Enter your experience:",
  "This sound should prevent any thoughts — if you have thoughts please report them here:",
  "Has your experience been altered by the sound?",
  "Allow the sound to wash over you. Examine it.",
  "Some of these sounds are known to produce [insert feeling]. What do you think this sound does?",
  "Can you hear what is being communicated?",
  "Accept your immediate response, your first feeling. Seek to understand what comes after.",
  "You are correct.",
  "Are you experiencing or have you ever experienced nonlocal intelligence?",
  "Synchronicity is the coming together of inner and outer events that are not explicitly linked but are very meaningful to those who have the experience.",
  "Where is the center?",
  "Our imaginations have become exterior to ourselves.",
  "Cognition occurs within a network that extends into the environment.",
  "Would you like to keep going?",
  "ok",
  "What comes after?",
  "Consciousness could be defined as the process by which informational associations are retrieved and traversed.",
  "A hierophany is a manifestation of the sacred.",
  "Can you listen deeper?",
  "Can you perceive more?",
  "What if you stop?",
  "begin again.",
];

const oscillators = [];

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
    // empty textbox
    testimony.value = "";
    // modulo counters
    let modtonezcount = count % tonez.length;
    let modtextcount = count % placeholder.length;
    // change placeholder to string from placeholder array
    testimony.placeholder = placeholder[modtextcount];
    //change tone
    oscillators.forEach((osc, i) => {
      osc.frequency.rampTo(tonez[modtonezcount][i], 1.5);
    });
    console.log(tonez[modtonezcount]);
    count++;
  });
}
