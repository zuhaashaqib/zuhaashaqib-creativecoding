let song;
let fft;
let amplitude;
let particles = [];

function preload() {
  song = loadSound('audio.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 255);
  fft = new p5.FFT();
  noStroke();

  // Floating background particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      speed: random(0.2, 0.6),
      hue: random(200, 280)
    });
  }
}

function draw() {
  background(240, 30, 5, 50); 

  for (let p of particles) {
    fill(p.hue, 30, 70, 60);
    ellipse(p.x, p.y, p.size);
    p.y += p.speed;
    if (p.y > height) {
      p.y = 0;
      p.x = random(width);
    }
  }

  let spectrum = fft.analyze();
  let waveform = fft.waveform();
  let centerX = width / 2;
  let centerY = height / 2;

  // Vertical bars 
  let barWidth = 4;
  for (let i = 0; i < waveform.length; i += 8) {
    let x = map(i, 0, waveform.length, 0, width);
    let wVal = waveform[i];
    let h = map(wVal, -1, 1, -100, 100); // center-aligned bars
    fill(200 + h % 40, 50, 100, 120);
    rect(x, centerY, barWidth, h);
  }

  // Radiating lines from center
let bassEnergy = fft.getEnergy("bass");

if (bassEnergy > 180) {
  push();
  translate(centerX, centerY);

  for (let i = 0; i < 360; i += 8) {
    let r = map(bassEnergy, 180, 255, 60, 180); 
    let x = r * cos(i);
    let y = r * sin(i);

    for (let glow = 3; glow >= 1; glow--) {
      stroke(220 + r % 30, 60, 100, 30 * glow); 
      strokeWeight(glow); 
      line(0, 0, x, y);
    }
  }

  pop();
}

}

// Function to play or pause song
function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
