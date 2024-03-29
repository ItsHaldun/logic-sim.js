// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
var canvas;
var moduleList;
var font;
var playground;

var rightClickMenu;
var hoveredItem = null;

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
	canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault());
	
	playground = new Playground();

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
	playground.draw();

	// Hovered Item Detection
	hoveredItem = detectHover();

	if (draggedModule) {
		draggedModule.drag();
	}

	// Draw the Connections
	push();
	strokeWeight(6);
	fill(40, 0);
	for (let i = 0; i<connections.length; i++) {
		// Check pins for determining curve direction
		let controlDst = 500;
		let firstDir = 1;
		let secondDir = 1;
		if (connections[i][0].isInput) {
			firstDir = -1;
		}
		if (connections[i][1].isInput) {
			secondDir = -1;
		}
		stroke(connections[i][0].state*128, 0, 0);
		curve(connections[i][0].x - firstDir*controlDst, connections[i][0].y, 
				  connections[i][0].x, connections[i][0].y, 
				  connections[i][1].x, connections[i][1].y, 
				  connections[i][1].x - secondDir*controlDst, connections[i][1].y);
	}

	if (clickedPin != null) {
		// Check pins for determining curve direction
		let controlDst = 500;
		let Dir = 1;
		if (clickedPin.isInput) {
			Dir = -1;
		}
		stroke(clickedPin.state*128, 0, 0);
		curve(clickedPin.x - Dir*controlDst, clickedPin.y, 
					clickedPin.x, clickedPin.y,
					mouseX, mouseY,
					mouseX + Dir*controlDst, mouseY);
	}
	pop();

	// Draw the Modules
	for (let i=0; i<moduleList.length; i++) {
		moduleList[i].draw(font);
	}
}

function mousePressed() {
	// Open Menu if right clicked
	if(mouseButton === RIGHT) {
		print(hoveredItem);
		return;
	}

	if(mouseButton === LEFT) {
		if(hoveredItem instanceof Module) {
			draggedModule = hoveredItem;
		}
	}
}

function mouseReleased() {
  if (draggedModule) {
		draggedModule = null;
	}
}

function mouseClicked() {
	if (mouseButton === LEFT) {
		// Detects if clicked on a Pin
		if (!draggedModule && (hoveredItem instanceof Pin)) {
			if (clickedPin == null) {
				clickedPin = hoveredItem;
			}
			else if (clickedPin != hoveredItem){
				let connection;
				if (hoveredItem.x > clickedPin.x) {
					connection = [clickedPin, hoveredItem];
				}
				else {
					connection = [hoveredItem, clickedPin];
				}

				// If the chosen connection is not already established, do it
				if (!listContainsList(connections, connection)) {
					connections.push(connection);
				}
				// If it is already established, remove it
				else {
					connections.splice(indexOfList(connections, connection), 1);
				}
				clickedPin = null;
			}
		}
	}
}

// Just Like "IndexOf" but designed to work for lists within lists
function indexOfList(searchList, targetList) {
	for (let i = 0; i < searchList.length; i++) {
		if (listsEqual(searchList[i], targetList)) {
			return i;
		}
	}
	return -1;
}


function listContainsList(searchList, targetList) {
	for (let i = 0; i < searchList.length; i++) {
		if (listsEqual(searchList[i], targetList)) {
			return true;
		}
	}
	return false;
}

// Code by enyo from Stack Overflow
function listsEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function detectHover () {
	// Module Pins Hover Detection
	if (!draggedModule) {
		for (let i=0; i<moduleList.length; i++) {
			for (let j=0; j<moduleList[i].inputs.length; j++) {
				if (Math.abs(moduleList[i].inputs[j].x - mouseX) < moduleList[i].inputs[j].size*0.5 && Math.abs(moduleList[i].inputs[j].y - mouseY) < moduleList[i].inputs[j].size*0.5) {
					moduleList[i].inputs[j].onHover = true;
					return moduleList[i].inputs[j];
				}
				else {
					moduleList[i].inputs[j].onHover = false;
				}
			}
	
			for (let j=0; j<moduleList[i].outputs.length; j++) {
				if (Math.abs(moduleList[i].outputs[j].x - mouseX) < moduleList[i].outputs[j].size*0.5 && Math.abs(moduleList[i].outputs[j].y - mouseY) < moduleList[i].outputs[j].size*0.5) {
					moduleList[i].outputs[j].onHover = true;
					return moduleList[i].outputs[j];
				}
				else {
					moduleList[i].outputs[j].onHover = false;
				}
			}
		}
	}

	// Module Hover Detection
	for (let i=0; i<moduleList.length; i++) {
		if (moduleList[i].onHover()) {
			return moduleList[i];
		}
	}

	// If nothing else, it's the playground
	return playground;
}