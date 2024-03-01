/*
Value       State
----------  ----------
 -1         Disconnected
  0         False
 +1         True
*/

class Module {
	constructor(x, y, scale, color=[random(255), random(255), random(255)]) {
		this.name = "";
		this.inputs = [];
		this.outputs = [];

		this.x = x;
		this.y = y;
		this.scale = scale;
		this.color = color;
	}

	setName(name) {
		this.name = name;
	}

	setColor(color) {
		this.color = color;
	}

	addInputPins(amount=1) {
		for (let i=0; i< amount; i++) {
			this.inputs.push(-1);
		}
	}

	removeinputPin() {
		this.input.pop();
	}

	setInputPin (pinNo, value=-1) {
		// If the pinNo is outside the range, return
		if (pinNo >= this.inputs.length()) {
			print("PinNo outside range");
			return false;
		}

		// If the value is not one of the tree states, return
		if (![-1,0,1].includes(value)) {
			print("State value is unrecognized");
			return false;
		}

		this.inputs[pinNo] = value;
	}

	// Sets all input pins
	setInputs (valueList) {
		// If the valueList is of different length than input list, return
		if (valueList.length != this.inputs.length()) {
			print("Pin sizes do not match!");
			return false;
		}

		for (let i=0; i<valueList.length; i++) {
			this.setInputPin(i, valueList[i]);
		}
	}

	addOutputPins(amount) {
		for (let i=0; i< amount; i++) {
			this.outputs.push(-1);
		}
	}

	removeOutputPin() {
		this.outputs.pop();
	}

	setOutputPin (pinNo, value=-1) {
		// If the pinNo is outside the range, return
		if (pinNo >= this.outputs.length()) {
			print("PinNo outside range");
			return false;
		}

		// If the value is not one of the tree states, return
		if (![-1,0,1].includes(value)) {
			print("State value is unrecognized");
			return false;
		}

		this.outputs[pinNo] = value;
	}

	// Sets all output pins
	setOutputs (valueList) {
		// If the valueList is of different length than input list, return
		if (valueList.length != this.outputs.length()) {
			print("Pin sizes do not match!");
			return false;
		}

		for (let i=0; i<valueList.length; i++) {
			this.setOutputPin(i, valueList[i]);
		}
	}

	getInputs () {
		return this.inputs;
	}

	getOutputs () {
		return this.outputs;
	}

	draw(font, fontSize=32) {
		let width = 100*this.scale;
		let height = 32*this.scale*max(this.inputs.length, this.outputs.length);
		
		push();
		// Draw the Module Box
		fill(this.color[0], this.color[1], this.color[2]);
		strokeWeight(4*this.scale);
		rect(this.x, this.y, width, height);

		// Draw the Text
		noStroke();
		textSize(fontSize*this.scale);
		let bbox = font.textBounds(this.name, 0, 0);
		fill(0, 128);
		rect(this.x + width/2 - (1+1/this.name.length)*bbox.w/2 - bbox.x, this.y + height/2 + bbox.y/2, (1+1/this.name.length)*bbox.w, bbox.h);
		fill(255);
		text(this.name, this.x + width/2 - (1+1/this.name.length)*bbox.w/2, this.y + height/2 - bbox.y/2);

		// Draw the Input Pins
		fill(0);
		for (let i=0; i<this.inputs.length; i++) {
			circle(this.x, this.y + (i+1)*height/(this.inputs.length+1), 20*this.scale);
		}

		// Draw the Output Pins
		for (let i=0; i<this.outputs.length; i++) {
			circle(this.x + width, this.y + (i+1)*height/(this.outputs.length+1), 20*this.scale);
		}
		pop();
	}

	dragModule() {
		return;
	}
}