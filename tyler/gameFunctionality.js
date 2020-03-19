let gameSpeed = 5;

let currentKey = -1
let keySequence = [];

let tempo = 80 //in bpm

let beatLength =  60000/tempo

let desiredSequence = [3/8, 3/8, 1/2, 1/4]

function doGameTick() {
	if ((currentKey > -1) && (currentKey < 5)) {
		keySequence[currentKey] += gameSpeed;
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
		//let actualNoteLength = 2 * beatLength * desiredSequence[i];	 // 4 heere? not susuuuure about note lengths
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

function buttonPressed() {
	setInterval(doGameTick, gameSpeed);	
	document.onkeydown = keyPressed
}