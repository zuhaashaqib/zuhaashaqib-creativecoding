let angleOffset = 0;

function setup() {
  createCanvas(400, 400);
  strokeWeight(1);
  noFill();
}

function draw() {
  background(20, 10, 30); 
  translate(width/2 , height/2) 

  let numLines = 50;
  let radius = 150;

  for (let i = 0; i < numLines; i++) {
    let angle = map(i, 0, numLines, 0, TWO_PI);
    let x = cos(angle + angleOffset) * radius;
    let y = sin(angle + angleOffset) * radius;

    stroke(random(255), random(255), random(255));
    line(0, 0, x, y);
  }

  angleOffset += 0.01; // Slowly rotate the pattern
}
