const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
const speech =
  new SpeechSynthesisUtterance() || window.webkitSpeechSythesisUtterance;
const rec = new SpeechRec();

let loop = true;

rec.onstart = () => {
  console.log("voice is activated");
};

rec.onresult = (e) => {
  const txt = e.resultIndex;

  const transcript = e.results[txt][0].transcript;
  content.textContent = transcript;

  read(transcript);
};

rec.onspeeachend = () => {};

btn.addEventListener("click", () => {
  rec.start();
});

//figure out how to stop the loop?
function read(message) {
  speech.text = message;
  window.speechSynthesis.speak(speech);

  if (loop) {
    speech.onend = () => {
      read(message);
    };
  }
}
