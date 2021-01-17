let sliders, db1, startStop, freqBoxs, panL, panR;

const oscillators = [];
const freqs = [100, 150, 225, 400];
const bassFreq = 100;

window.onload = () => {
  setup();
};

function setup() {
  sliders = document.querySelectorAll(".slider");
  db1 = document.querySelector("db1");
  startStop = document.querySelector("#startStop");
  freqBoxs = document.querySelectorAll(".freq");

  //update number boxes
  freqs.forEach((f, i) => {
    freqBoxs[i].value = f;
  });
  //setup oscillators
  for (let i = 0; i < 4; i++) {
    oscillators.push(
      new Tone.Oscillator({
        frequency: freqs[i],
        type: "square",
        volume: -Infinity,
        // detune: Math.random() * 30 - 15,
      }).toDestination()
    );
  }

  //start and stop oscillators
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
      o.volume.rampTo(-20, 0.5);
    });
  });
  //connect sliders oscillator volumes
  sliders.forEach((slider, i) => {
    slider.addEventListener("input", (e) => {
      oscillators[i].volume.rampTo(slider.value, 0.1);
    });
  });
  //update frequencies [make seperate function]
  freqBoxs.forEach((freq, i) => {
    freq.addEventListener("change", () => {
      if (freq.value > 20 && freq.value < 20000) {
        oscillators[i].frequency.rampTo(freq.value, 1);
      }
    });
  });
}
