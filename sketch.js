// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)

var testModule;
var font;

function preload() {
  font = loadFont("assets/HelveticaBoldCondensed.otf");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight-10);

	testModule = new Module(100, 100, 1);
	testModule.addInputPins(2);
	testModule.addOutputPins(1);
}

function draw() {
  // put drawing code here
  background(40);

	testModule.draw(font);
}