let antennaAngle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background('#1c1c3c'); // dark space
  translate(width / 2, height / 2);

  drawBody();
  drawEyes();
  drawMouth();
  drawAntennae();

  antennaAngle += 2;
}

function drawBody() {
  push();
  fill('limegreen'); // lime green
  stroke(0);
  strokeWeight(2);
  ellipse(0, 50, 150, 180); // main body
  pop();
}

function drawEyes() {
  push();
  fill('white');
  stroke(0);
  strokeWeight(1);

  // Rectangular eyes
  rectMode(CENTER);
  rect(-30, 0, 25, 25);
  rect(0, -10, 30, 30);
  rect(30, 0, 25, 25);

  // Pupils
  fill('black');
  rect(-30, 0, 10, 10);
  rect(0, -10, 12, 12);
  rect(30, 0, 10, 10);
  pop();
}


function drawMouth() {
  push();
  fill('pink'); // pink
  arc(0, 40, 50, 30, 0, 180, CHORD); // smiling mouth
  pop();
}

function drawAntennae() {
  push();
  stroke('#FFDE59');
  strokeWeight(3);
  fill('lime');

  // Connect antennae to the top of the body
  let baseY = -50;

  // Left antenna
  push();
  translate(-25, baseY);
  rotate(sin(antennaAngle) * 10);
  line(0, 0, -20, -40);
  ellipse(-20, -40, 10, 10);
  pop();

  // Right antenna
  push();
  translate(25, baseY);
  rotate(-sin(antennaAngle) * 10);
  line(0, 0, 20, -40);
  ellipse(20, -40, 10, 10);
  pop();

  pop();
}
