let audioContext;
let isAudioPlaying = false;
const audioButton = document.getElementById("audioControl");

function setupAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioButton.addEventListener("click", toggleAudio);
}

function toggleAudio() {
  if (isAudioPlaying) {
    audioContext.suspend();
    isAudioPlaying = false;
    audioButton.innerHTML = "AUDIO<br>OFF";
  } else {
    audioContext.resume();
    isAudioPlaying = true;
    audioButton.innerHTML = "AUDIO<br>ON";
    scheduleNextChirp();
  }
}

function playChirp() {
  if (!isAudioPlaying) return;

  const now = audioContext.currentTime;
  const chirpType = Math.random();

  if (chirpType < 0.6) playTone(1000 + Math.random() * 9000, now);
  else if (chirpType < 0.8) playTone(200 + Math.random() * 800, now);
  else if (chirpType < 0.9) {
    playTone(1000 + Math.random() * 9000, now);
    playTone(1000 + Math.random() * 9000, now + 0.1);
  } else {
    playTone(1000 + Math.random() * 9000, now);
    playTone(1000 + Math.random() * 9000, now, true);
  }

  scheduleNextChirp();
}

function playTone(baseFreq, startTime, isDissonant = false) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(baseFreq, startTime);

  if (isDissonant) {
    oscillator.detune.setValueAtTime(Math.random() * 50 - 25, startTime);
  }

  const panner = audioContext.createStereoPanner();
  panner.pan.setValueAtTime(Math.random() * 2 - 1, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.03, startTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(
    0,
    startTime + 0.1 + Math.random() * 0.2
  );

  oscillator.connect(panner);
  panner.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + 0.3);
}

function scheduleNextChirp() {
  if (!isAudioPlaying) return;
  const delay = 200 + Math.random() * 800;
  setTimeout(playChirp, delay);
}

setupAudio();
