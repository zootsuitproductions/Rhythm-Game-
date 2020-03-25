let fr = 60;
let apple;
let ang;
let img;

let currentKey = -1
let keySequence = [0,0,0,0,0,0,0,0];

let desiredSequence = [3/8, 3/8, 1/2, 1/4]

function preload(){
  img = loadImage('/tyler/pictures/apples/apple1.png');
}

function setup() {
	createCanvas(700,400)
	angle = 0;
	apple = {
		x: width/2,
		y: 0,
		width: 25,
		height: 25
	}
	angleMode(DEGREES)
}

function draw() {
	background(100)
	angle += 2.5;
	apple.y = map(sin(angle),-1,1,(height/2) + 20,(height/2)-20)
	imageMode(CENTER)
	image(img,apple.x,apple.y,apple.width,apple.height)

	if ((currentKey > -1) && (currentKey < 5)) {
		keySequence[currentKey] += 5;
	}
}


function keyPressed() {
	if (currentKey < 4) {
		keySequence.push(0);
		currentKey ++;
		console.log(keySequence);
	} else if (currentKey === 4) {
		currentKey ++;
		console.log(checkCorrectness());
	}
}

function checkCorrectness() {
	let correct = true;
	for (i = 0; i < desiredSequence.length; i ++) {
		let actualNoteLength = keySequence[0]*(1/desiredSequence[0]) * desiredSequence[i]; //WORKS WITH ANY TEMPO
		console.log(actualNoteLength);
		if (Math.abs(keySequence[i]/actualNoteLength - 1) > 0.15) {
			correct = false;
			console.log("bad");
		} else {
			console.log("good");
		}
	}
	return correct;
}
