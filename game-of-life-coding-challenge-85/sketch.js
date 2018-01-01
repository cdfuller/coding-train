const RESOLUTION = 10;

let g;

function setup() {
	let cols = floor(windowWidth / RESOLUTION);
	let rows = floor(windowHeight / RESOLUTION);
	createCanvas(cols * RESOLUTION, rows * RESOLUTION);
	background(51);
	noStroke();
	frameRate(5);

	g = new Grid(cols, rows);
}

function draw() {
	background(51);
	g.calcNext();
	g.update();
	g.show();
}

class Grid {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;

		this.cells = [];
		this.generate();
	}

	
	generate() {
		this.cells = new Array(this.cols);
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i] = new Array(this.rows);
			let x = i * RESOLUTION;
			for (let j = 0; j < this.cells[i].length; j++) {
				let y = j * RESOLUTION;
				let value = floor(random(2));
				this.cells[i][j] = new Cell(x, y, RESOLUTION, value);
			}
		}

		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				for (let k = -1 ; k < 2 ; k++) {
					for (let l = -1; l < 2; l++) {
						let x = ((i + k) + this.cells.length) % this.cells.length;
						let y = ((j + l) + this.cells[i].length) % this.cells[i].length;
						let otherCell = this.cells[x][y];
						this.cells[i][j].addNeighbor(otherCell);
					}
				}
			}
		}

	}

	show() {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].show();
			}
		}
	}

	calcNext() {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].calcNext();
			}
		}
	}

	update() {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].update();
			}
		}
	}
}


class Cell {
	constructor(x, y, width, value) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.value = value;
		this.neighbors = [];
	}

	show() {
		if (this.isAlive()) {
			fill(0);
		} else {
			fill(255);
		}

		rect(this.x, this.y, this.width-1, this.width-1);
	}

	isAlive() {
		return !!this.value;
	}

	isDead() {
		return !this.value;
	}

	die() {
		this.nextValue = 0;
	}

	live() {
		this.nextValue = 1;
	}

	addNeighbor(otherCell) {
		if (this !== otherCell) {
			this.neighbors.push(otherCell);
		}
	}

	livingNeighborCount() {
		let c = 0;
		for (let n of this.neighbors) {
			if (n.isAlive()) {
				c++;
			}
		}
		return c;
	}

	calcNext() {
		let numNeighborsAlive = this.livingNeighborCount();
		let cellIsAlive = this.isAlive();

		if (cellIsAlive) {
			// 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
			if (numNeighborsAlive < 2) {
				this.die();

			// 2. Any live cell with two or three live neighbours lives on to the next generation.
			} else if (numNeighborsAlive === 2 || numNeighborsAlive === 3) {
				this.live();

			// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
			} else if (numNeighborsAlive > 3) {
				this.die();
			}

		// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		} else if (numNeighborsAlive === 3) {
			this.live();
		}

	}

	update() {
		this.value = this.nextValue;
		this.nextValue = 0;
	}
}