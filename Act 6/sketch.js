let quote = "make it happen";
let fontSize = 110;
let stars = [];

function setup() {
  createCanvas(1000, 1000);
  textFont('Helvetica');
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  colorMode(RGB);
  noStroke();

  // Background stars
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 10),
      phase: random(TWO_PI)
    });
  }
}


function draw() {
  background(230, 230, 245); 

  //Brightness of stars
  for (let star of stars) {
    let brightness = 80 + sin(frameCount * 0.02 + star.phase) * 50; 
    fill(brightness);
    ellipse(star.x, star.y, star.size);
  }

  let spacing = width / (quote.length + 1);

  for (let i = 0; i < quote.length; i++) {
    let x = spacing * (i + 1);
    let bounce = sin(frameCount * 0.05 + i * 0.3) * 20;

    
    let r = 60 + sin(frameCount * 0.01 + i) * 30;
    let g = 60 + sin(frameCount * 0.01 + i + 2) * 20;
    let b = 160 + sin(frameCount * 0.01 + i + 4) * 60;

    fill(r, g, b);
    text(quote[i], x, height / 2 + bounce);
  }
}

