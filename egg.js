// Get the SVG element with id "egg"
const egg = document.getElementById("egg");

// Initialize arrays and factors
let paths = []; // Will store path objects
let glowFactor = 1; // Controls the thickness of the paths
let sizeFactor = 1; // Controls the overall size of the egg shape

// Define an array of colors for the swirls
// const colors = [
//   "#ff0000", // Red
//   "#00ff00", // Green
//   "#0000ff", // Blue
//   "#ffff00", // Yellow
//   "#00ffff", // Cyan
//   "#ff00ff", // Magenta
// ];

// Define an array of psychedelic iridescent cloud colors
//const colors = [
//  "#FF6AD5", // Vibrant pink
//  "#C774E8", // Lavender
//  "#AD8CFF", // Periwinkle
//  "#8795E8", // Pastel blue
//  "#94D0FF", // Light cyan
//  "#FF6AD5", // Vibrant pink (repeated to ensure 6 colors)
// ];

// Define an array of diverse psychedelic colors
const colors = [
  "#FF00FF", // Magenta (red-purple)
  "#FF6B00", // Neon orange
  "#00FF00", // Lime green (pure green)
  "#00FFFF", // Cyan (blue-green)
  "#8A2BE2", // Blue violet
  "#FF00FF", // Magenta repeated to ensure 6 colors
];

// Function to create a single swirl
function createSwirl(colorIndex, delay, offset) {
  // Create a new SVG path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // Set path attributes
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", colors[colorIndex]);
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  // Add the path to the SVG
  egg.appendChild(path);
  // Store the path and its properties
  paths.push({ path, colorIndex, delay, offset });
}

// Create multiple swirls, one for each color (except the last one)
colors.slice(0, -1).forEach((color, index) => {
  createSwirl(index, index * 80, index * 0.2);
});

// Animation function
function animate(time) {
  // Calculate the blossom effect cycle
  const blossomCycle = Math.sin(time / 2000) * 0.5 + 0.5;

  // Update each path
  paths.forEach(({ path, colorIndex, delay, offset }) => {
    // Adjust color index if color shift is enabled (note: isColorShiftEnabled and colorShiftIndex are not defined in this snippet)
    const adjustedColorIndex = isColorShiftEnabled
      ? (colorIndex + Math.floor(colorShiftIndex)) % (colors.length - 1)
      : colorIndex;

    // Set the path's color and width
    path.setAttribute("stroke", colors[adjustedColorIndex]);
    path.setAttribute("stroke-width", (2 * glowFactor).toString());

    // Calculate time factor
    const t = (time - delay) / 3.33;
    const points = [];

    // Generate points for the path
    for (let i = 0; i < 200; i++) {
      // Calculate base position of the point
      const angle = 0.1 * i - 0.0045 * t + offset;
      let x = 172.5 + 115 * Math.sin(angle) * Math.sin(i / 20);
      let y = 230 + 172.5 * Math.cos(angle);

      // Apply size factor
      x = 172.5 + (x - 172.5) * sizeFactor;
      y = 230 + (y - 230) * sizeFactor;

      // Calculate and apply blossom effect
      const distanceFromTop = Math.abs(y - 23);
      const blossomFactor = Math.max(0, 1 - distanceFromTop / 100);
      const blossomAmount = 30 * blossomCycle * blossomFactor;

      x += ((x - 172.5) * blossomAmount) / 100;
      y += ((y - 23) * blossomAmount) / 100;

      // Add point to the path
      points.push(`${x},${y}`);
    }

    // Set the path's shape
    path.setAttribute("d", `M${points.join("L")}`);
  });

  // Request next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);
