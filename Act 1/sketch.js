function setup() {
  createCanvas(400, 200);
  background(180, 215, 220); // Light blue
  drawCar(100, 100);
}

function drawCar(x, y) {
  fill(190, 80, 110);  // Darker pink
  rect(x, y, 150, 40, 10);
  
  // Curved top (semi-circle arc) in lighter pink
  fill(220, 140, 180); 
  arc(x + 75, y, 110, 60, PI, 0, CHORD); // Centered arc for roof
  fill(173, 216, 230); // Light blue
  ellipse(x + 55, y - 15, 20, 20); // Left window
  ellipse(x + 95, y - 15, 20, 20); // Right window

  // Wheels
  fill(50); // Dark gray
  ellipse(x + 30, y + 40, 30, 30); // Left wheel
  ellipse(x + 120, y + 40, 30, 30); // Right wheel
  
// Small grey circular rims inside wheels
  fill(150); 
  ellipse(x + 30, y + 40, 15, 15); // Left wheel rim 
  ellipse(x + 120, y + 40, 15, 15); // Right wheel rim (circle)

  // Ground lines
  stroke(0);
  line(0, y + 55, width, y + 55);
  line(0, y + 58, width, y + 58);
  line(0, y + 90, width, y + 90);
  line(0, y + 93, width, y + 93); 
}


