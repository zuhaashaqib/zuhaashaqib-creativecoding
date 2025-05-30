let candies = [];
let particles = [];
let colors = ['red', 'blue', 'green', 'yellow', 'purple'];
let currentColorIndex = 0;
let score = 0;
let feedback = '';
let feedbackTimer = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  spawnCandies(7);
}

function draw() {
  background('lightpink');

  // Show instructions
  fill(50);
  textSize(20);
  text("Click candies in this order:", width / 2, 30);

  // Show current color sequence
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(0);
    strokeWeight(i === currentColorIndex ? 3 : 1);
    ellipse(width / 2 - 100 + i * 50, 60, 30);
  }

  // Update and display candies
  for (let candy of candies) {
    candy.move();
    candy.display();
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Feedback
  if (feedbackTimer > 0) {
    textSize(24);
    fill(feedback === 'Wrong!' ? 'red' : 'green');
    text(feedback, width / 2, height - 40);
    feedbackTimer--;
  }

  // Score
  fill(50);
  textSize(18);
  text("Score: " + score, width - 80, 30);
}

function mousePressed() {
  for (let i = candies.length - 1; i >= 0; i--) {
    if (candies[i].isClicked(mouseX, mouseY)) {
      if (candies[i].color === colors[currentColorIndex]) {
        score++;
        feedback = "Correct!";
        feedbackTimer = 60;
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        candies.splice(i, 1);
        spawnCandies(1);
      } else {
        feedback = "Wrong!";
        feedbackTimer = 60;
        explode(candies[i].x, candies[i].y, candies[i].color);
        candies.splice(i, 1);
        spawnCandies(1);
      }
      break;
    }
  }
}


function spawnCandies(num) {
  let newCandies = [];
  let targetColor = colors[currentColorIndex];
  let hasTarget = false;

  for (let i = 0; i < num; i++) {
    let c = new Candy();
    if (c.color === targetColor) hasTarget = true;
    newCandies.push(c);
  }

  if (!hasTarget) {
    let forcedCandy = new Candy();
    forcedCandy.color = targetColor;
    newCandies[int(random(newCandies.length))] = forcedCandy;
  }

  candies = candies.concat(newCandies);
}

function explode(x, y, col) {
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(x, y, col));
  }
}

class Candy {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(100, height - 50);
    this.size = 30;
    this.color = random(colors);
    this.vx = random(-1.5, 1.5);
    this.vy = random(-1.5, 1.5);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 80 || this.y > height) this.vy *= -1;
  }

  display() {
    push();
    translate(this.x, this.y);

    // Create gradient fill (glossy candy style)
    let ctx = drawingContext;
    let gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, this.size / 2);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.3, this.color);
    gradient.addColorStop(1, this.color);

    ctx.save(); // Save drawing state
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.size / 2, 0, TWO_PI);
    ctx.fill();
    ctx.restore(); // Restore so other drawing is unaffected

    // Glossy highlight
    noStroke();
    fill(255, 150);
    ellipse(-this.size * 0.2, -this.size * 0.2, this.size * 0.3, this.size * 0.2);

    
    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(0, 0, this.size);

    pop();
  }


  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size / 2;
  }
}

//  Particle Class for explosion
class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.lifespan = 255;
    this.color = col;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 4;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 6);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
