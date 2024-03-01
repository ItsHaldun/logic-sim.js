class Pin {
	constructor (isInput, state=-1, name="", scale=1) {
		this.state = state;
		this.name = name;

		this.connectedTo = null;

		this.x = 0;
		this.y = 0;
		this.size = 0;

		this.scale = scale;
		this.isInput = isInput;

		this.onHover = false;
	}

	draw(x, y, size, font, fontSize=12) {
		this.x = x;
		this.y = y;
		this.size = size;

		strokeWeight(this.scale);
		stroke(0);

		push();
		if (this.onHover) {
			fill(80);
		}
		else {
			if (this.state==1) {
				fill(128,0,0);
			}
			else {
				fill(0);
			}
		}
		circle(this.x, this.y, this.size);

		if (this.onHover) {
			textSize(fontSize*this.scale);
			textFont(font);
			let bbox = font.textBounds(this.name, 0, 0);
			
			noStroke();
			fill(255);
			if (this.isInput) {
				text(this.name, this.x - this.size - bbox.w/2, this.y - bbox.y/2);
			}
			else {
				text(this.name, this.x + this.size - bbox.w/2, this.y - bbox.y/2);
			}
			
		}
		else {
			fill(0);
		}

		pop();
	}
}