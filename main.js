let isShifting = false;
let isColorShiftEnabled = false;
let isGlowEnabled = false;
let isSizeEnabled = false;
let colorShiftIndex = 0;

function updateEffects(time) {
  if (isColorShiftEnabled && isShifting) {
    colorShiftIndex = (colorShiftIndex + 0.05) % colors.length;
  }
  if (isGlowEnabled && isShifting) {
    glowFactor = 1 + Math.sin(time / 200) * 0.5;
  } else {
    glowFactor = 1;
  }
  if (isSizeEnabled && isShifting) {
    sizeFactor = 1 + Math.sin(time / 300) * 0.1;
  } else {
    sizeFactor = 1;
  }
}

// Effect toggle buttons
const colorShiftToggle = document.getElementById("colorShiftToggle");
const glowToggle = document.getElementById("glowToggle");
const sizeToggle = document.getElementById("sizeToggle");

function toggleEffect(button, effect) {
  button.classList.toggle("active");
  return !effect;
}

colorShiftToggle.addEventListener(
  "click",
  () =>
    (isColorShiftEnabled = toggleEffect(colorShiftToggle, isColorShiftEnabled))
);
glowToggle.addEventListener(
  "click",
  () => (isGlowEnabled = toggleEffect(glowToggle, isGlowEnabled))
);
sizeToggle.addEventListener(
  "click",
  () => (isSizeEnabled = toggleEffect(sizeToggle, isSizeEnabled))
);

// Keyboard and touch interaction
function startShifting() {
  isShifting = true;
}

function stopShifting() {
  isShifting = false;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "i") startShifting();
});

document.addEventListener("keyup", (event) => {
  if (event.key === "i") stopShifting();
});

const colorShiftButton = document.getElementById("colorShiftButton");
colorShiftButton.addEventListener("pointerdown", startShifting);
colorShiftButton.addEventListener("pointerup", stopShifting);
colorShiftButton.addEventListener("pointerout", stopShifting);

// Start animation loop
function animationLoop(time) {
  updateEffects(time);
  requestAnimationFrame(animationLoop);
}
requestAnimationFrame(animationLoop);
