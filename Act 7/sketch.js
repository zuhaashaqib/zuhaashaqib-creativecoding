let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  background(10, 10, 30);
  noStroke();
}

function draw() {
  background(240, 20, 10, 50);

  trail.push({
    x: mouseX,
    y: mouseY,
    alpha: 255,
    hue: (frameCount * 2) % 360
  });

  if (trail.length > 60) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];

    // Bigger base size and adjusted ring spacing
    for (let j = 0; j < 5; j++) {
      let size = 80 - j * 15; // outermost circle is 80px, next 65px, etc.
      let hue = (p.hue + j * 15) % 360;
      fill(hue, 100, 100, p.alpha - j * 10);
      ellipse(p.x, p.y, size);
    }

    p.alpha -= 4;
  }
}
