class Playground {
	constructor(borderOffset=20) {
		this.borderOffset = borderOffset;
		this.inputs = [];
		this.outputs = [];
	}

	saveModule() {
		return;
	}

	loadModule() {
		return;
	}

	permuate() {
		return;
	}

	draw() {
		background(40);
		// Draw the playground
		push();
		strokeWeight(5);
		stroke(60);
		fill(0,0);
		rect(this.borderOffset, this.borderOffset, windowWidth-2*this.borderOffset, windowHeight-10-2*this.borderOffset);
		pop();
	}
}
