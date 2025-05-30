let message1 = "Welcome to Bath Spa";
let message2 = "University";
let letterOffsets1 = [];
let letterOffsets2 = [];

let bgMode = 0; // Controls which background pattern to show

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(48);
  noStroke();
  textFont('Georgia');
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < message1.length; i++) {
    letterOffsets1.push(random(TWO_PI));
  }
  for (let i = 0; i < message2.length; i++) {
    letterOffsets2.push(random(TWO_PI));
  }
}

function draw() {
  drawBackgroundPattern();
  drawAnimatedText();
  drawLighthouseLines();
}

function drawBackgroundPattern() {
  if (bgMode === 0) {
    background(120, 20, 24); // muted green
    for (let b = 0; b <= width; b += 40) {
      for (let c = 0; c <= height; c += 40) {
        noStroke();
        fill(120, 20, 30); // slightly brighter green
        triangle(b, c, b - 15, c + 30, b + 15, c + 30);
      }
    }
  } else if (bgMode === 1) {
  background(210, 60, 40); // muted deep blue background
  for (let h = 0; h <= width; h += 40) {
    for (let i = 0; i <= height; i += 40) {
      noStroke();
      fill(200, 80, 70); // soft sky blue dots
      ellipse(h, i, 20, 20);
    }
  }
}

 
  else if (bgMode === 2) {
    background(280, 30, 30); // purple tone
    for (let f = 0; f <= width; f += 40) {
      for (let g = 0; g <= height; g += 40) {
        noStroke();
        fill(300, 20, 40); // light violet rectangles
        rect(f, g, 15, 10);
      }
    }
  }
}

function drawAnimatedText() {
  let totalWidth1 = textWidth(message1);
  let totalWidth2 = textWidth(message2);
  let yBase = height / 2;

  let xStart1 = width / 2 - totalWidth1 / 2;
  let xStart2 = width / 2 - totalWidth2 / 2;

  for (let i = 0; i < message1.length; i++) {
    let letter = message1[i];
    let offset = letterOffsets1[i];
    let yFloat = sin(frameCount * 0.05 + offset) * 10;

    fill(340, 30, 100); // pastel pink
    text(letter, xStart1 + textWidth(message1.substring(0, i)), yBase - 30 + yFloat);
  }

  for (let i = 0; i < message2.length; i++) {
    let letter = message2[i];
    let offset = letterOffsets2[i];
    let yFloat = sin(frameCount * 0.05 + offset) * 10;

    fill(280, 30, 90); // soft purple
    text(letter, xStart2 + textWidth(message2.substring(0, i)), yBase + 30 + yFloat);
  }
}

function drawLighthouseLines() {
  let mx = mouseX;
  stroke(0, 0, 100, 0.3); // white with opacity
  for (let x = -width; x < width * 2; x += 10) {
    line(windowWidth / 2, 0, x + mx - width / 2, windowHeight);
  }
  for (let z = -width; z < width * 2; z += 20) {
    line(windowWidth / 2, 0, z, windowHeight);
  }
}

function mousePressed() {
  bgMode = (bgMode + 1) % 3; // cycle through 0 → 1 → 2 → back to 0
}
