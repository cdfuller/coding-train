let particles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	// colorMode(HSB);
	background(255);
	p = new Particle();
	particles.push(p);
}

function draw() {
	// background(0);
	for (let i = 0; i < 5; i++) {
		p = new Particle();
		particles.push(p);
	}
	for (let i =particles.length - 1; i > 0; i--) {
		particles[i].update();
		particles[i].show();
		if (particles[i].finished()) {
			particles.splice(i, 1);
		}
	}
}

class Particle {

	constructor() {
		this.x = width/2;
		this.y = height*0.9;
		this.vx = random(-1, 1);
		this.vy = random(-1.5, 0.3);
		this.diameter = 8;
		this.alpha = 5;
		// this.color = [random(360), random(80, 100), random(80, 100)];
		let shade = 0;
		this.color = [shade, shade, shade];
	}

	finished() {
		return this.alpha < 0;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.alpha -= 0.01;
	}

	show() {
		// stroke(255);
		noStroke();
		fill(this.color[0], this.color[1], this.color[2], this.alpha);
		ellipse(this.x, this.y, this.diameter);
		
	}
}
