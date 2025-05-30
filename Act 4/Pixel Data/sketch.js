let img;

function preload() {
  img = loadImage('bird.jpg'); 
}

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);  
  img.loadPixels();        // Access the image pixels

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * img.width) * 4; 

      // Invert the color
      img.pixels[i]     = 255 - img.pixels[i];    
      img.pixels[i + 1] = 255 - img.pixels[i + 1];
      img.pixels[i + 2] = 255 - img.pixels[i + 2];
    }
  }

  img.updatePixels();        
  image(img, 0, 0);          
}
