let languages = [
  { name: "English", speakers: 1500 },
  { name: "Mandarin", speakers: 1117 },
  { name: "Hindi", speakers: 615 },
  { name: "Spanish", speakers: 560 },
  { name: "French", speakers: 310 },
  { name: "Arabic", speakers: 274 },
  { name: "Bengali", speakers: 273 },
  { name: "Russian", speakers: 258 },
  { name: "Portuguese", speakers: 258 },
  { name: "Urdu", speakers: 231 }
];

let maxVal;
let hoverIndex = -1;

function setup() {
  createCanvas(1000, 600);
  textFont('Helvetica');
  maxVal = max(languages.map(l => l.speakers));
  colorMode(HSB, 360, 100, 100, 255);
  textAlign(LEFT, CENTER);
}

function draw() {
  // Background gradient
  setGradient(0, 0, width, height, color(230, 20, 15), color(230, 10, 8));

  // Heading
  textSize(30);
  textAlign(CENTER,CENTER);
  fill(255);
  text("🌍 Most Spoken Languages in the World (2023)", width / 2, 50);
  textAlign(LEFT, CENTER);
  
  let barHeight = 30;
  let spacing = 50;
  let startX = 220;
  let startY = 110;
  hoverIndex = -1;

  for (let i = 0; i < languages.length; i++) {
    let lang = languages[i];
    let barLength = map(lang.speakers, 0, maxVal, 0, width - 300);
    let x = startX;
    let y = startY + i * spacing;

    // Hover detection
    let isHovered = mouseX > x && mouseX < x + barLength && mouseY > y - barHeight / 2 && mouseY < y + barHeight / 2;
    if (isHovered) hoverIndex = i;

    // Language name
    fill(240);
    textSize(16);
    text(lang.name, 40, y);

    // Bar with gradient and glow
    let hueStart = map(i, 0, languages.length, 200, 280);
    let hueEnd = hueStart + 20;

    for (let j = 0; j < barLength; j++) {
      let interHue = map(j, 0, barLength, hueStart, hueEnd);
      stroke(interHue, isHovered ? 100 : 60, 100, 200);
      strokeWeight(1);
      line(x + j, y - barHeight / 2, x + j, y + barHeight / 2);
    }

    if (isHovered) {
      // Glow effect
      for (let g = 5; g > 0; g--) {
        stroke(0, 0, 100, 15 * g);
        strokeWeight(g * 2);
        line(x, y, x + barLength, y);
      }
    }
  }

  // Tooltip box
  if (hoverIndex !== -1) {
    let lang = languages[hoverIndex];
    let infoText = `${lang.name}: ${lang.speakers}M`;
    textSize(14);
    let padding = 10;
    let textW = textWidth(infoText) + padding * 2;
    let textH = 30;

    fill(0, 200);
    stroke(255, 100);
    strokeWeight(1);
    rect(mouseX, mouseY - textH - 10, textW, textH, 8);

    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    text(infoText, mouseX + padding, mouseY - textH / 2 - 10);
  }
}

// Function to draw a vertical gradient background
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
