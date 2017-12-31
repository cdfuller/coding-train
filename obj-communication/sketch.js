const MIN_BUBBLE_RADIUS = 10
const MAX_BUBBLE_RADIUS = 50
const NUM_OF_BUBBLES = 1000;

const bubbles = [];
function setup() {
	// createCanvas(600, 400);
	createCanvas(windowWidth, windowHeight);
	for (let i = 0 ; i < NUM_OF_BUBBLES; i++) {
		let x = random(width);
		let y = random(height);
		let r = random(MIN_BUBBLE_RADIUS, MAX_BUBBLE_RADIUS);
		bubbles[i] = new Bubble(x, y, r);
	}
	background(51);
}

function draw() {
	// background(51);

	for (let b of bubbles) {
		// b.show();
		b.move();
	}

	for (let i = 0; i < bubbles.length; i++) {
		const alpha = bubbles[i];

		let j = i + 1;
		while (!alpha.alive && j < bubbles.length) {
	  	const beta = bubbles[j];

			if (alpha.intersects(beta)) {
				alpha.drawConnectingLine(beta);
				alpha.alive = true;
				beta.alive = true;
			}

			j++;
		}
	}

	for (let b of bubbles) {
		if (b.alive) {
			b.changeColor(b.brightness + 10);
		} else {
			b.changeColor(b.brightness - 1);
		}
		b.alive = false;
	}
}

class Bubble {
	constructor(x, y, r = 50) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
		this.alive = false;
	}

	intersects(otherBubble) {
		const d = dist(this.x, this.y, otherBubble.x, otherBubble.y);

		return d < this.r + otherBubble.r;
	}

	drawConnectingLine(otherBubble) {
		let lineBrightness = map(this.r + otherBubble.r,
			MIN_BUBBLE_RADIUS*2,
			MAX_BUBBLE_RADIUS*2,
			-100,
			355);
		lineBrightness = constrain(lineBrightness, 0, 255);
		strokeWeight(0.5);
		stroke(lineBrightness);
		line(this.x, this.y, otherBubble.x, otherBubble.y);

	}

	changeColor(bright) {
		this.brightness = constrain(bright, 0, 255);
	}

	contains(px, py) {
		let d = dist(px, py, this.x, this.y);
		if (d < this.r) {
			return true;
		} else {
			return false;
		}
	}

	move() {
		this.x = this.x + random(-2, 2);
		this.y = this.y + random(-2, 2);
	}

	setPos(x, y) {
		this.x = x;
		this.y = y;
	}

	show() {
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 125);
		ellipse(this.x, this.y, this.r * 2);
	}
}