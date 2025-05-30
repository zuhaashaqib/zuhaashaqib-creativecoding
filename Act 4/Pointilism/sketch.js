let img;

function preload() {
  img = loadImage('bird.jpg');  
}

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);
  background(255);
  noStroke();
  frameRate(900); // Dot drawing speed
}

function draw() {
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let c = img.get(x, y);
  fill(c);
  ellipse(x, y, 20, 20); // Dots size
}
