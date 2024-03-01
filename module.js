/*
Value       State
----------  ----------
 -1         Disconnected
  0         False
 +1         True
*/

class Module {
	constructor(x, y, wScale=100, hScale=32, scale=1, color=[random(255), random(255), random(255)]) {
		this.name = "";
		this.inputs = [];
		this.outputs = [];

		this.x = x;
		this.y = y;
		this.wScale = wScale;
		this.hScale = hScale;
		this.width = wScale*scale;
		this.height = hScale*scale*max(this.inputs.length, this.outputs.length);
		this.scale = scale;
		this.color = color;

		this.clickOffset = [0, 0];
	}

	setName(name) {
		this.name = name;
	}

	setColor(color) {
		this.color = color;
	}

	addInputPins(amount=1) {
		for (let i=0; i< amount; i++) {
			this.inputs.push(new Pin(true));
		}
		this.height = this.hScale*this.scale*max(this.inputs.length, this.outputs.length);
	}

	removeinputPin() {
		this.input.pop();
		this.height = this.hScale*this.scale*max(this.inputs.length, this.outputs.length);
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

		this.inputs[pinNo].state = value;
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
			this.outputs.push(new Pin(false));
		}
		this.height = this.hScale*this.scale*max(this.inputs.length, this.outputs.length);
	}

	removeOutputPin() {
		this.outputs.pop();
		this.height = this.hScale*this.scale*max(this.inputs.length, this.outputs.length);
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

		this.outputs[pinNo].state = value;
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
		push();
		// Draw the Module Box
		fill(this.color[0], this.color[1], this.color[2]);
		strokeWeight(4*this.scale);
		rect(this.x, this.y, this.width, this.height);

		// Draw the Text
		noStroke();
		textSize(fontSize*this.scale);
		textFont(font);
		let bbox = font.textBounds(this.name, 0, 0);
		fill(0, 128);
		rect(this.x + this.width/2 - bbox.w/2, this.y + this.height/2 + bbox.y/2, bbox.w, bbox.h);
		fill(255);
		text(this.name, this.x + this.width/2 - bbox.w/2, this.y + this.height/2 - bbox.y/2);

		// Draw the Input Pins
		fill(0);
		for (let i=0; i<this.inputs.length; i++) {
			this.inputs[i].draw(this.x, this.y + (i+1)*this.height/(this.inputs.length+1), 20*this.scale, font);
		}

		// Draw the Output Pins
		for (let i=0; i<this.outputs.length; i++) {
			this.outputs[i].draw(this.x + this.width, this.y + (i+1)*this.height/(this.outputs.length+1), 20*this.scale, font);
		}
		pop();
	}

	onPress() {
		if (mouseX>this.x && mouseX<this.x+this.width && mouseY>this.y && mouseY<this.y+this.height) {
			this.clickOffset[0] = mouseX-this.x;
			this.clickOffset[1] = mouseY-this.y;
			return true;
		}
		else {
			return false;
		}
	}

	drag() {
		this.x = mouseX - this.clickOffset[0];
		this.y = mouseY - this.clickOffset[1];
	}
}