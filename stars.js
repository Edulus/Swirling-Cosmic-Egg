// Create a canvas and append it to the document body
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height
canvas.style.zIndex = "0"; // Ensure the canvas is behind other elements
document.body.appendChild(canvas); // Add canvas to the DOM

const ctx = canvas.getContext("2d"); // Get the 2D drawing context for the canvas

const stars = []; // Array to hold all the stars
const numStars = 100; // Total number of stars

// Initialize stars with random positions, sizes, and velocities
for (let i = 0; i < numStars; i++) {
  const movingDown = i < numStars * 0.6; // 60% of stars will move downward
  stars.push({
    x: Math.random() * canvas.width, // Random horizontal position
    y: Math.random() * canvas.height, // Random vertical position
    radius: Math.random() * 2, // Random size of the star
    vx: Math.random() * 2 - 1, // Random horizontal velocity
    vy: movingDown
      ? Math.random() * 0.5 + 0.5
      : (Math.random() * 50 - 25) * 0.01, // Downward or random vertical motion
  });
}

// Function to draw the starfield and update star positions
function draw() {
  // Clear the canvas with a slightly transparent black fill for a trailing effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw each star and update its position
  ctx.fillStyle = "white"; // Set star color
  stars.forEach((star) => {
    // Draw the star as a small circle
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
    ctx.fill();

    // Update the star's position based on its velocity
    star.x += star.vx * 0.01;
    star.y += star.vy * 0.01;

    // Wrap stars around the screen when they move out of bounds
    if (star.x < 0 || star.x > canvas.width)
      star.x = Math.random() * canvas.width;
    if (star.y < 0 || star.y > canvas.height)
      star.y = Math.random() * canvas.height;
  });

  // Recursively call the draw function for the next animation frame
  requestAnimationFrame(draw);
}

// Start the drawing loop
draw();

// Resize the canvas when the window is resized to maintain full-screen coverage
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
