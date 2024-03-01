// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
var canvas;
var moduleList;
var font;

// Some Drawing Helpers
var draggedModule = null;
var clickedPin = null;
var connections = [];

function preload() {
  font = loadFont("assets/Roboto-Bold.ttf");
}

function setup() {
  // put setup code here
  canvas = createCanvas(windowWidth, windowHeight-10);

	moduleList = [];

	moduleList.push(new Module(100, 100));
	moduleList[0].addInputPins(2);
	moduleList[0].addOutputPins(1);
	moduleList[0].setName("AND");

	moduleList.push(new Module(500, 600));
	moduleList[1].addInputPins(3);
	moduleList[1].addOutputPins(1);

	moduleList.push(new Module(1000, 200));
	moduleList[2].addInputPins(8);
	moduleList[2].addOutputPins(8);
	moduleList[2].setName("BFR");
}

function draw() {
  // put drawing code here
  background(40);

	// Hover Detection
	for (let i=0; i<moduleList.length; i++) {
		for (let j=0; j<moduleList[i].inputs.length; j++) {
			if (Math.abs(moduleList[i].inputs[j].x - mouseX) < moduleList[i].inputs[j].size*0.5 && Math.abs(moduleList[i].inputs[j].y - mouseY) < moduleList[i].inputs[j].size*0.5) {
				moduleList[i].inputs[j].onHover = true;
			}
			else {
				moduleList[i].inputs[j].onHover = false;
			}
		}

		for (let j=0; j<moduleList[i].outputs.length; j++) {
			if (Math.abs(moduleList[i].outputs[j].x - mouseX) < moduleList[i].outputs[j].size*0.5 && Math.abs(moduleList[i].outputs[j].y - mouseY) < moduleList[i].outputs[j].size*0.5) {
				moduleList[i].outputs[j].onHover = true;
			}
			else {
				moduleList[i].outputs[j].onHover = false;
			}
		}
	}

	if (draggedModule) {
		draggedModule.drag();
	}

	for (let i=0; i<moduleList.length; i++) {
		moduleList[i].draw(font);
	}

	// Draw the Connections
	push();
	strokeWeight(8);
	for (let i = 0; i<connections.length; i++) {
		stroke(connections[i][0].state*128, 0, 0);
		line(connections[i][0].x, connections[i][0].y, connections[i][1].x, connections[i][1].y);
	}

	if (clickedPin != null) {
		stroke(clickedPin.state*128, 0, 0);
		line(clickedPin.x, clickedPin.y, mouseX, mouseY);
	}
	pop();
}

function mousePressed() {
	let moduleIndex = NaN;
  for (let i=0; i<moduleList.length; i++) {
		if (moduleList[i].onPress()) {
			moduleIndex = i;
		}
	}
	if (moduleIndex != NaN) {
		draggedModule = moduleList[moduleIndex];
	}
	else {
		draggedModule = null;
	}
}

function mouseReleased() {
  if (draggedModule) {
		draggedModule = null;
	}
}

function mouseClicked() {
	// Detects if clicked on a Pin
	if (!draggedModule) {
		for (let i=0; i<moduleList.length; i++) {
			for (let j=0; j<moduleList[i].inputs.length; j++) {
				if (Math.abs(moduleList[i].inputs[j].x - mouseX) < moduleList[i].inputs[j].size*0.5 && Math.abs(moduleList[i].inputs[j].y - mouseY) < moduleList[i].inputs[j].size*0.5) {
					if (clickedPin == null) {
						clickedPin = moduleList[i].inputs[j];
					}
					else if (clickedPin != moduleList[i].inputs[j]){
						connections.push([clickedPin, moduleList[i].inputs[j]]);
						clickedPin = null;
					}
				}
			}
			for (let j=0; j<moduleList[i].outputs.length; j++) {
				if (Math.abs(moduleList[i].outputs[j].x - mouseX) < moduleList[i].outputs[j].size*0.5 && Math.abs(moduleList[i].outputs[j].y - mouseY) < moduleList[i].outputs[j].size*0.5) {
					if (clickedPin == null) {
						clickedPin = moduleList[i].outputs[j];
					}
					else if (clickedPin != moduleList[i].outputs[j]){
						connections.push([clickedPin, moduleList[i].outputs[j]]);
						clickedPin = null;
					}
				}
			}
		}
	}
}