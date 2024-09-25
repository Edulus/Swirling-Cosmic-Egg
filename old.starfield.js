// Create a canvas element
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.zIndex = "0";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const stars = [];
const numStars = 200;

// Function to create a star
function createStar() {
  const isMovingDown = Math.random() < 0.75;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.1,
    isMovingDown: isMovingDown,
    directionX: isMovingDown ? 0 : Math.random() * 2 - 1,
    directionY: isMovingDown ? 1 : Math.random() * 2 - 1,
    trail: [],
    trailLength: isMovingDown ? 0 : Math.floor(Math.random() * 10) + 5,
  };
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
  stars.push(createStar());
}

function draw() {
  // Clear the canvas with a dark color
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw and update stars
  stars.forEach((star) => {
    // Draw fading trail for non-downward moving stars
    if (!star.isMovingDown) {
      ctx.beginPath();
      star.trail.forEach((pos, index) => {
        const alpha = (index / star.trail.length) * 0.1;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(
          pos.x,
          pos.y,
          star.radius * (index / star.trail.length),
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
      });
    }

    // Draw the star
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 0.7, false);
    ctx.fill();

    // Update star position
    star.x += star.speed * star.directionX;
    star.y += star.speed * star.directionY;

    // Update trail
    if (!star.isMovingDown) {
      star.trail.unshift({ x: star.x, y: star.y });
      if (star.trail.length > star.trailLength) {
        star.trail.pop();
      }
    }

    // Reset star if it goes off screen
    if (
      star.x < 0 ||
      star.x > canvas.width ||
      star.y < 0 ||
      star.y > canvas.height
    ) {
      Object.assign(star, createStar());
      star.trail = []; // Clear the trail when resetting
      if (star.isMovingDown) {
        star.y = 0;
      }
    }
  });

  requestAnimationFrame(draw);
}

draw();

// Resize canvas when window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars.length = 0; // Clear existing stars
  for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
  }
});
