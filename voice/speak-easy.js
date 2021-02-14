const msg1 = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg1.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    // .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice, i) =>
        `<option value="${voice.name}">v${i} (${voice.lang})</option>`
    )
    .join("");
}

function setVoice() {
  msg1.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  // ↓starts stuff over w/ option changes↓
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg1);
    //turns looping on
    msg1.onend = () => toggle(startOver);
  }
  //turn looping off
  msg1.onend = () => toggle(startOver);
}

function setOption() {
  console.log(this.name, this.value);
  msg1[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));
