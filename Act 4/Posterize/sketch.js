let img;

function preload() {
  img = loadImage('bird.jpg');
}

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);
  image(img, 0, 0);
  filter(POSTERIZE, 4); 
}
