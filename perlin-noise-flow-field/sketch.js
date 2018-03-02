let inc = 0.1;
let scl = 20;
let cols, rows;
let zOff = 0;

let particles = [];
let PARTICLE_COUNT = 1000;

let flowfield = [];

function setup() {
  createCanvas(800, 800);
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(255, 15);

  let yOff = 0;

  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      let idx = x + y * cols
      let r = noise(xOff, yOff, zOff);
      let v = p5.Vector.fromAngle(r * TWO_PI);
      v.setMag(0.1);
      flowfield[idx] = v;
      xOff += inc;
      stroke(0, 75);
      strokeWeight(0.5);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
    }
    yOff += inc;
  }
  zOff += 0.015;

  for (let i = 0; i < particles.length; i++) {
    // particles[i].follow(flowfield);
    // particles[i].update();
    // particles[i].show();
  }
}


function createField(rows, cols) {
  this.rows = rows;
  this.cols = cols;
}


function mousePressed() {
  noLoop();
}

function keyPressed() {
  loop();
}